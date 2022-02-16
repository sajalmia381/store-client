import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { getAccessToken, getUserData } from 'src/app/auth/state/auth.selectors';
import JwtService from '@shared/helper/JwtService';
import { loginSuccess } from 'src/app/auth/state/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/auth/refresh') !== -1) {
      return next.handle(request);
    }
    return this.store.select(getUserData).pipe(
      take(1),
      switchMap((data: any) => {
        const accessToken: string = data?.access_token;
        if (!accessToken) {
          return next.handle(request);
        };
        if (JwtService.isTokenValid(accessToken)) {
          let modifiedReq = request.clone({
            headers: request.headers.append('Authorization', `Bearer ${accessToken}`)
          });
          return next.handle(modifiedReq)
        };
        return this.authService.generateNewTokens(data?.refresh_token).pipe(
          switchMap((res: any) => {
            let modifiedReq = request.clone({
              headers: request.headers.append('Authorization', `Bearer ${res?.data?.access_token}`)
            });
            this.authService.saveTokensLocalStorage(res.data);
            this.store.dispatch(loginSuccess({ userData: res.data, redirect: false }))
            return next.handle(modifiedReq)
          })
        )
      })
    );
  }
}
