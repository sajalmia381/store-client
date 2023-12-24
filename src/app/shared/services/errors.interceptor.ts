import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/v0/auth/state/auth.state';
import { logoutSuccess } from 'src/app/v0/auth/state/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>, private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
  }

  private errorHandler(response: any): Observable<any> {
    if (!environment.production) {
      console.log('errorHandler Response', response);
    }
    const status = response?.status;
    if (status === 401 || status === 403) {
      this.snackBar.open('May be session is ended! please login again', 'close', {
        duration: 10000
      });
      this.store.dispatch(logoutSuccess());
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
      message = 'Connection is not stable! Check server or internet connection';
    }
    this.snackBar.open(message, 'close', {
      duration: 5000
    });
    return throwError(() => ({ message, status, error }));
  }
}
