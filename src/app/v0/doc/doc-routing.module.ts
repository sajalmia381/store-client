import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocComponent } from './doc.component';
import { docResourceResolver } from './common/resolvers/doc-resource.resolver';

const resourceRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./containers/intro-doc/intro-doc.component').then(m => m.IntroDocComponent),
    data: {
      title: 'Resources | Documentation',
      description: 'api resouces',
      keywords: `product fake api, category fake api, cart fake api, auth fake api`
    }
  },
  {
    path: 'product',
    loadComponent: () => import('./containers/product-doc/product-doc.component').then(m => m.ProductDocComponent),
    data: {
      title: 'Product | Resources | Documentation',
      description: 'product curd api with nested category, user data',
      keywords: `product fake api`
    }
  },
  {
    path: 'category',
    loadComponent: () => import('./containers/category-doc/category-doc.component').then(m => m.CategoryDocComponent),
    data: {
      title: 'Category | Resources | Documentation',
      description: 'Categroy crud api',
      keywords: `category fake api`
    }
  },
  {
    path: 'cart',
    loadComponent: () => import('./containers/cart-doc/cart-doc.component').then(m => m.CartDocComponent),
    data: {
      title: 'Cart | Resources | Documentation',
      description: 'crud fake apis ',
      keywords: `cart fake api, cart crud api`
    }
  },
  {
    path: 'user',
    loadComponent: () => import('./containers/user-doc/user-doc.component').then(m => m.UserDocComponent),
    data: {
      title: 'User | Resources | Documentation',
      description: 'User crud fake api',
      keywords: `user crud apis user fake api`
    }
  },
  {
    path: 'auth',
    loadComponent: () => import('./containers/auth-doc/auth-doc.component').then(m => m.AuthDocComponent),
    data: {
      title: 'Auth | Resources | Documentation',
      description: 'JWT authentication login , registration, refresh token',
      keywords: `jwt authentication, login api, registration api, refresh api`
    }
  },
  {
    path: 'todo',
    loadComponent: () => import('./containers/todo-doc/todo-doc.component').then(m => m.TodoDocComponent),
    data: {
      title: 'Todo | Resources | Documentation',
      description: 'todo crud apis',
      keywords: `todo fake api`
    }
  },
  {
    path: '**',
    loadComponent: () => import('../../errors/error-404/error-404.component').then(m => m.Error404Component),
    data: {
      title: '404 | Documentation',
      homeBtnLink: "/docs",
      homeBtnLabel: "Go To Resources"
    }
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
