import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';
import { LOGIN_ENDPOINT } from './auth.endpoint';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpService: HttpService) {}

  onLogin(username: string, password: string): Observable<any> {
    return this.httpService.post(LOGIN_ENDPOINT, { username, password });
  }

  setUserInLocalStorage(userData: any): void {
    localStorage.setItem('kc-requester', JSON.stringify(userData));
  }
}
