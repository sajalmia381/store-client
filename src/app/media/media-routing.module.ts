import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBaseGuard } from '@shared/guards/role-base.guard';
import { ImageListComponent } from './image-list/image-list.component';

const routes: Routes = [
  {
    path: 'images',
    component: ImageListComponent,
    // canActivate: [RoleBaseGuard]
  },
  {
    path: '',
    pathMatch: 'exact',
    redirectTo: '/media/images'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
