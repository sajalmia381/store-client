import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: '<USERNAME>'
})
export class UserService {
  constructor(private http: HttpService) {}

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
  updateUser(user: User): Observable<User> {
    console.log('user api', user);
    return this.http.put('/users/' + user?._id, user);
  }
  deleteUser(id: string): Observable<User> {
    return this.http.delete('/users/' + id);
  }
}
