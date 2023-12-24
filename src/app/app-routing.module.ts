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
    loadComponent: () => import('./v0/home/home.component').then(m => m.HomeComponent),
    data: {
      title: 'Home',
      description: 'Prototype fake eCommerce rest api',
      keywords: `fake api online, free fake api, fake api for testing, fake api store, fake rest api, fake api json,
      login fake api, restapi, fake api, fake store api,
      jsonplaceholder,
      json placeholder,
      fake api,
      json api testing,
      test json api,
      json placeholder api,
      free json api,
      free api test,
      dummy apis,
      dummy api,
      fake json api,
      free api for testing,
      fake rest api`
    }
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
  // {
  //   path: 'v1',
  //   loadChildren: () => import('./v1/v1.module').then(m => m.V1Module)
  // },
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
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
      // scrollOffset: [0, 70] // [x, y]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
