import jwtDecode from 'jwt-decode';
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
import { resetRequester } from 'src/app/auth/state/auth.actions';

@Injectable()
export class HttpClintInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept er call')
    return this.store.select(getToken).pipe(
      exhaustMap(accessToken => {
        console.log('exhaust map access token', accessToken)
        if (!accessToken) {
          return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
        }
        // if (this.isAuthTokenInvalid(accessToken)) {
        //   this.store.dispatch(resetRequester());          
        //   return next.handle(request).pipe(catchError(res => this.errorHandler(res)));
        // }
        let modifiedReq = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + accessToken)
        });
        return next.handle(modifiedReq).pipe(catchError(res => this.errorHandler(res)));
      })
    );
  }
  
  isAuthTokenInvalid(accessToken: string): boolean {
    const decoded: any = jwtDecode(accessToken);
    console.log('recoded', decoded)
    const currentTime = Date.now();
    console.log(decoded?.exp, currentTime)
    console.log(typeof decoded?.exp, typeof currentTime)
    console.log(new Date(decoded?.exp))
    console.log('now', new Date(currentTime))
    
    console.log(decoded?.exp - currentTime)
    if (decoded?.exp < currentTime) {
      this.snackBar.open('Your Session have been Expired!! Please Sign In again.', 'Close', {
        duration: 10000
      });
      return false;
    }
    return true;
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
