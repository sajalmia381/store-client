import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const <USERNAME>Routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./v0/doc/doc.module').then(m => m.DocModule)
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./v0/home/home.component').then(m => m.HomeComponent)
  }
];

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./v0/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./@admin/admin.module').then(m => m.adminModule)
  },
  // V1
  {
    path: 'v1',
    loadChildren: () => import('./v1/v1.module').then(m => m.V1Module)
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: <USERNAME>Routes
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      // scrollOffset: [0, 70] // [x, y]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
