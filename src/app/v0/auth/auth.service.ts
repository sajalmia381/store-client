import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@shared/services/http.service';
import { LOGIN_ENDPOINT, REFRESH_ENDPOINT } from './auth.endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenDuration: string = 'short';
  constructor(private httpService: HttpService) {}

  onLogin(email: string, password: string): Observable<any> {
    const qp = {
      duration: this.tokenDuration
    }
    return this.httpService.post(LOGIN_ENDPOINT, { email, password });
  }
  
  generateNewTokens(refresh_token: string): Observable<HttpEvent<any>> {
    const qp = {
      duration: this.tokenDuration
    }
    return this.httpService.post(REFRESH_ENDPOINT, { refresh_token })
  }

  saveTokensLocalStorage(tokens: any): void {
    localStorage.setItem('access_token', tokens?.access_token);
    localStorage.setItem('refresh_token', tokens?.refresh_token);
  }
}
