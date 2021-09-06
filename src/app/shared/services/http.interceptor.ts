import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { catchError, exhaustMap } from 'rxjs/operators';
import { getToken } from 'src/app/auth/state/auth.selectors';

@Injectable()
export class HttpClintInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      exhaustMap(token => {
        if (!token) {
          return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
        }
        let modifiedReq = request.clone({
          headers: request.headers.append('x-auth-token', token)
        });
        return next.handle(modifiedReq).pipe(catchError(res => this.errorHandler(res)));
      })
    );
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
