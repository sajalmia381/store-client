import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { map, withLatestFrom } from 'rxjs/operators';
import { getUserData } from 'src/app/auth/state/auth.selectors';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';

@Injectable({
  providedIn: 'root'
})
export class RoleBaseGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private snackBar: MatSnackBar) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getUserData).pipe(
      withLatestFrom(this.store.select(getCurrentRoute)),
      map(([userData, routeData]) => {
        // console.log(userData);
        // console.log('route Data', routeData);
        // Check auth token exists.
        if (!userData?.token) {
          return this.router.createUrlTree(['/auth/login']);
        }
        // Check auth token expiration
        if (!this.isAuthTokenValid(userData?.token)) {
          return this.router.createUrlTree(['/auth/logout']);
        }
        // Check Roles permission
        const userAuthorities = userData?.authorities;
        const validRoles = routeData.data?.authorities || [];
        if (!validRoles.some((r: string) => userAuthorities.includes(r))) {
          return this.router.createUrlTree(['/error/404']);
        }
        return true;
      })
    );
  }

  isAuthTokenValid(accessToken: string): boolean {
    const decoded: any = jwtDecode(accessToken);
    const currentTime = Date.now();
    if (decoded?.token_expiration_date < currentTime) {
      this.snackBar.open('Your Session have been Expired!! Please Sign In again.', 'Close', {
        duration: 10000
      });
      return false;
    }
    return true;
  }
}
