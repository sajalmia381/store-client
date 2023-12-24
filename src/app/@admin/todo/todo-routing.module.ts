import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    data: {
      title: 'Todo List | Dashboard',
      description: 'todo list view',
      keywords: `todo list page`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
