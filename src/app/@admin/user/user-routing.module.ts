import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    path: ':id/edit',
    component: UserUpdateComponent,
    data: {
      title: 'User Update | Dashboard',
      description: 'user update form view',
      keywords: `user update page`
    }
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    data: {
      title: 'User Description | Dashboard',
      description: 'user description view',
      keywords: `user description page`
    }
  },
  {
    path: 'add-user',
    component: UserFormComponent,
    data: {
      title: 'User Form | Dashboard',
      description: 'add new user form',
      keywords: `user form page`
    }
  },
  {
    path: '',
    component: UserListComponent,
    data: {
      title: 'User List | Dashboard',
      description: 'user list view',
      keywords: `user list page`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
