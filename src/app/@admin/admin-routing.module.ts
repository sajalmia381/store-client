import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
const childRoutes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'todos',
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'carts',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaModule)
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: '**',
    loadComponent: () => import('../errors/error-404/error-404.component').then(m => m.Error404Component),
    data: {
      title: '404 | Admin',
      homeBtnLink: "/admin",
      homeBtnLabel: "Go To Dashboard"
    }
  }
];
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: childRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule {}
