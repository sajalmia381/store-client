import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoState } from '../state/todo.state';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { getTodos, isLoaded } from '../state/todo.selectors';
import { loadTodos } from '../state/todo.actions';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  private store = inject<Store<TodoState>>(Store);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['title', 'status', 'completed'];
  dataSource: any;

  isLoaded$: Observable<boolean> = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  private todos$: Observable<Todo[]> = this.store.select(getTodos).pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.todos$.subscribe(categories => {
      this.dataSource = categories;
    });
    this.store.dispatch(loadTodos());
  }

  onTodoForm(): void {
    this.dialog.open(TodoFormComponent, {
      width: '100%',
      maxWidth: '450px'
    });
  }
}
