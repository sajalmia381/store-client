import { Injectable, inject } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpService);


  getUsers(): Observable<User[]> {
    return this.http.get('/users').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addUser(user: User): Observable<User> {
    return this.http.post('/users', user);
  }
  getUser(id: string): Observable<User> {
    return this.http.get('/users/' + id);
  }
  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put('/users/' + userId, user);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete('/users/' + id);
  }
}
