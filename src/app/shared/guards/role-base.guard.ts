import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { map, withLatestFrom } from 'rxjs/operators';
import { getUserData } from 'src/app/v0/auth/state/auth.selectors';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';

@Injectable({
  providedIn: '<USERNAME>'
})
export class RoleBaseGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private snackBar: MatSnackBar) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('call role guard');
    return this.store.select(getUserData).pipe(
      withLatestFrom(this.store.select(getCurrentRoute)),
      map(([userData, routeData]) => {
        // console.log(userData);
        // console.log('route Data', routeData);
        // Check auth token exists.
        if (!userData?.access_token) {
          return this.router.createUrlTree(['/auth/login']);
        }
        // Check auth token expiration
        // if (!this.isAuthTokenInvalid(userData?.access_token)) {
        //   return this.router.createUrlTree(['/auth/logout']);
        // }
        // Check Roles permission
        console.log('check permission');
        const _role = userData?.data?.role;
        console.log('routes data', routeData);
        const validRoles = routeData.data?.authorities || [];
        if (!validRoles.includes(_role)) {
          //!validRoles.some((r: string) => userAuthorities.includes(r))
          return this.router.createUrlTree(['/error/404']);
        }
        return true;
      })
    );
  }

  isAuthTokenInvalid(accessToken: string): boolean {
    const decoded: any = jwtDecode(accessToken);
    const currentTime = Date.now();
    console.log(decoded?.exp, currentTime);
    if (decoded?.exp < currentTime) {
      this.snackBar.open('Your Session have been Expired!! Please Sign In again.', 'Close', {
        duration: 10000
      });
      return false;
    }
    return true;
  }
}
