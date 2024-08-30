import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { AuthService } from '../auth.service';
import { loginRequest, loginSuccess, logoutSuccess, setLoginError } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  private action$ = inject(Actions);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginRequest),
      exhaustMap(action => {
        console.log('action', action);
        return this.authService.onLogin(action?.email, action?.password).pipe(
          map(res => {
            console.log(res);
            const tokens = res?.data;
            this.authService.saveTokensLocalStorage(tokens);
            this.store.dispatch(setLoading({ status: false }));
            return loginSuccess({ userData: tokens, redirect: true });
          }),
          catchError(error => {
            if (error?.error?.code === 'INVALID_USER') {
              this.store.dispatch(setLoginError({ payload: { password: 'Password is not valid' } }));
            } else {
              this.store.dispatch(setLoginError({ payload: { email: 'User is not found!' } }));
            }
            this.store.dispatch(setLoading({ status: false }));
            return throwError(error);
          })
        );
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccess),
        tap(action => {
          if (action.redirect) {
            this.router.navigate(['/admin']);
          }
        })
      ),
    {
      dispatch: false
    }
  );

  logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logoutSuccess),
        tap(action => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/auth/login']);
        })
      ),
    {
      dispatch: false
    }
  );
}
