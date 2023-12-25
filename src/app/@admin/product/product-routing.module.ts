import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {
    path: 'add-product',
    component: ProductFormComponent,
    data: {
      title: 'Product Form | Dashboard',
      description: 'create new product view',
      keywords: `product form, add new product`
    }
  },
  {
    path: ':slug/edit',
    component: ProductUpdateComponent,
    data: {
      title: 'Product Update | Dashboard',
      description: 'product update view',
      keywords: `product update`
    }
  },
  {
    path: ':slug',
    component: ProductDetailsComponent,
    data: {
      title: 'Product Description | Dashboard',
      description: 'product description view',
      keywords: `product description page`
    }
  },
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent,
    data: {
      title: 'Product List | Dashboard',
      description: 'product list and grid view',
      keywords: `product list page, product grid page`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
