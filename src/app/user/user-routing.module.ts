import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    path: ':id',
    component: UserDetailsComponent
  },
  {
    path: ':id/edit',
    component: UserUpdateComponent
  },
  {
    path: 'add-user',
    component: UserFormComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
