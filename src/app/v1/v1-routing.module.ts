import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { V1Component } from './v1.component';

const v1Routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import("./v1-home/v1-home.component").then(c => c.V1HomeComponent)
  }
]

const routes: Routes = [
  {
    path: '',
    component: V1Component,
    children: v1Routes,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class V1RoutingModule { }
