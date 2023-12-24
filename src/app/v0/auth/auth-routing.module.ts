import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login | Auth',
      description: 'login page',
      keywords: `fake login example`
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout | Auth',
      description: 'logout process page',
      keywords: `logout page`
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
