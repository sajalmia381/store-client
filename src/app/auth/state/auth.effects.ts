import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { AuthService } from '../auth.service';
import { loginRequest, loginSuccess, logoutSuccess, setLoginError } from './auth.actions';

@Injectable({ providedIn: '<USERNAME>' })
export class AuthEffects {
  constructor(
    private action$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginRequest),
      exhaustMap(action => {
        return this.authService.onLogin(action?.email, action?.password).pipe(
          map(res => {
            const userData = {
              data: res?.data,
              access_token: res?.access_token,
              refresh_token: res?.refresh_token
            };
            this.authService.setUserInLocalStorage(userData);
            this.store.dispatch(setLoading({ status: false }));
            return loginSuccess({ userData, redirect: true });
          }),
          catchError(error => {
            if (error?.error?.code === 'INVALID_USER') {
              this.store.dispatch(
                setLoginError({ payload: { password: 'Password is not valid' } })
              );
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
        map(action => {
          return this.router.navigate(['/auth/login']);
        })
      ),
    {
      dispatch: false
    }
  );
}
