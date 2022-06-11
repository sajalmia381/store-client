import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBaseGuard } from '@shared/guards/role-base.guard';
import { ImageListComponent } from './image-list/image-list.component';

const authorities: string[] = ['ROLE_SUPER_ADMIN'];

const routes: Routes = [
  {
    path: 'images',
    component: ImageListComponent
    // canActivate: [RoleBaseGuard],
    // data: {
    //   authorities
    // }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: './images'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
