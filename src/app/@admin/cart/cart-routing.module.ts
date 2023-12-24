import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '',
    component: CartListComponent,
    data: {
      title: 'Cart List | Dashboard',
      description: 'cart dashboard list',
      keywords: `cart data`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
