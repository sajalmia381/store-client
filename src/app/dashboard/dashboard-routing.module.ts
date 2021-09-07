import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBaseGuard } from '../shared/guards/role-base.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [RoleBaseGuard],
    data: {
      authorities: ['ROLE_SUPER_ADMIN']
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
