import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { Todo } from './todo';
import { map } from 'rxjs/operators';

@Injectable()
export class TodoService {
  constructor(private http: HttpService) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get('/todos').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addTodo(category: Pick<Todo, 'title' | 'status'>): Observable<Todo> {
    console.log(category);
    return this.http.post('/todos', category);
  }
}
