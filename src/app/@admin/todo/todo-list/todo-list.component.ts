import { Component, DestroyRef, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
  // private destroyRef = inject(DestroyRef);

  isLoaded$!: Observable<boolean>;
  displayedColumns: string[] = ['title', 'completed'];
  dataSource: any;
  isAlive: boolean = true;

  private todos$: Observable<Todo[]> = this.store.select(getTodos).pipe(takeUntilDestroyed())

  constructor(private store: Store<TodoState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos$.subscribe(categories => {
      this.dataSource = categories;
    });
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadTodos());
  }

  onTodoForm(): void {
    this.dialog.open(TodoFormComponent, {
      width: '100%',
      maxWidth: '450px'
    })
  }
}
