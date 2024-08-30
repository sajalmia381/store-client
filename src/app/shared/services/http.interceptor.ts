import jwtDecode from 'jwt-decode';
import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { catchError, exhaustMap } from 'rxjs/operators';
import { getAccessToken } from 'src/app/v0/auth/state/auth.selectors';
import { logoutSuccess } from 'src/app/v0/auth/state/auth.actions';

@Injectable()
export class HttpClintInterceptor implements HttpInterceptor {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getAccessToken).pipe(
      exhaustMap(accessToken => {
        if (!accessToken) {
          return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
        }
        if (this.isAuthTokenInvalid(accessToken)) {
          this.store.dispatch(logoutSuccess());
          return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
        }
        let modifiedReq = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + accessToken)
        });
        return next.handle(modifiedReq).pipe(catchError(res => this.errorHandler(res)));
      })
    );
  }

  isAuthTokenInvalid(accessToken: string): boolean {
    const decoded: any = jwtDecode(accessToken);
    // default decoded exp format is second
    const expMilSecond: number = decoded?.exp * 1000; // milliseconds
    const currentTime = Date.now(); // milliseconds
    if (expMilSecond < currentTime) {
      this.snackBar.open('Your Session have been Expired!! Please Sign In again.', 'Close', {
        duration: 10000
      });
      return true;
    }
    return false;
  }
  private errorHandler(response: any) {
    console.log('errorHandler Response', response);
    const status = response?.status;
    if (status === 401 || status === 403) {
      this.snackBar.open('May be session is ended! please login again', 'close', {
        duration: 10000
      });
      this.router.navigate(['auth/logout']);
    }
    const error = response.error;
    let key = 'error';
    let message = response.message;
    if (typeof error === 'object') {
      const keys = Object.keys(error);
      key = keys[0];
      message = error.message;
    }
    if (typeof error === 'string') {
      message = error;
    }
    if (status === 0) {
      message = 'Connection is not stable';
    }
    this.snackBar.open(message, 'close', {
      duration: 8000
    });
    return throwError({ message, status, error });
  }
}
