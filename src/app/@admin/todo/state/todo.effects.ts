import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as todoAction from './todo.actions';
import { isLoaded } from './todo.selectors';
import { TodoService } from '../todo.service';

@Injectable()
export class TodoEffects {
  private store = inject(Store);
  private action$ = inject(Actions);
  private todoService = inject(TodoService);


  loadtodos$ = createEffect(() => {
    return this.action$.pipe(
      ofType(todoAction.loadCategories),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.todoService.getTodos().pipe(
          map(todos => {
            return todoAction.loadCategoriesSuccess({ todos });
          })
        );
      })
    );
  });

  addtodo$ = createEffect(() => {
    return this.action$.pipe(
      ofType(todoAction.addOneTodo),
      switchMap(action => {
        return this.todoService.addTodo(action.todo).pipe(
          map((res: any) => {
            const todo = res.data;
            return todoAction.addOneTodoSuccess({ todo });
          })
        );
      })
    );
  });
}
