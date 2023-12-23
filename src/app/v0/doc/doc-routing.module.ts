import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocComponent } from './doc.component';
import { docResourceResolver } from './common/resolvers/doc-resource.resolver';

const resourceRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./containers/intro-doc/intro-doc.component').then(m => m.IntroDocComponent)
  },
  {
    path: 'product',
    loadComponent: () => import('./containers/product-doc/product-doc.component').then(m => m.ProductDocComponent),
  },
  {
    path: 'category',
    loadComponent: () => import('./containers/category-doc/category-doc.component').then(m => m.CategoryDocComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./containers/cart-doc/cart-doc.component').then(m => m.CartDocComponent),
  },
  {
    path: 'user',
    loadComponent: () => import('./containers/user-doc/user-doc.component').then(m => m.UserDocComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./containers/auth-doc/auth-doc.component').then(m => m.AuthDocComponent),
  },
  {
    path: 'todo',
    loadComponent: () => import('./containers/todo-doc/todo-doc.component').then(m => m.TodoDocComponent),
  }
];

const routes: Routes = [
  {
    path: '',
    component: DocComponent,
    children: resourceRoute
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule {}
