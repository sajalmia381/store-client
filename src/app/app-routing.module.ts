import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const <USERNAME>Routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./doc/doc.module').then(m => m.DocModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }
];

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./@admin/admin.module').then(m => m.adminModule)
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: <USERNAME>Routes,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
