import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { TodoService } from './todo.service';
import { StoreModule } from '@ngrx/store';
import { TODO_STATE_NAME } from './state/todo.selectors';
import { todoReducer } from './state/todo.reducer';
import { TodoEffects } from './state/todo.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TodoListComponent, TodoFormComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatDialogModule,
    StoreModule.forFeature(TODO_STATE_NAME, todoReducer),
    EffectsModule.forFeature([TodoEffects])
  ],
  providers: [TodoService]
})
export class TodoModule {}
