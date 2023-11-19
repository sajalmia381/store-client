import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../todo';
import { TodoState } from '../state/todo.state';
import { Store } from '@ngrx/store';
import { addOneTodo, addOneTodoSuccess } from '../state/todo.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TodoForm {
  title: string,
  completed: boolean
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  private fb = inject(FormBuilder);
  private store: Store<TodoState> = inject(Store);

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    completed: [false]
  })

  private readonly addTodoSuccess$ = this.action$.pipe(
    ofType(addOneTodoSuccess),
    takeUntilDestroyed()
  )

  constructor(private dialogRef: MatDialogRef<TodoFormComponent>, private snackbar: MatSnackBar, private action$: Actions) {
    this.addTodoSuccess$.subscribe((res) => {
      this.snackbar.open("Successfully: Todo Added", 'Close', {
        duration: 5000
      })
      this.dialogRef.close(res.todo)
    })
  }

  onFormSubmit(): void {
    const formData = this.form.value as Pick<Todo, "title" | 'completed'>;
    this.store.dispatch(addOneTodo({ todo: formData}));
  }
}
