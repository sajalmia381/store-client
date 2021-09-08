import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { PRODUCT_STATE_NAME } from './state/product.selectors';
import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducer';
import { StoreModule } from '@ngrx/store';
import { ProductService } from './product.service';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductUpdateComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatTableModule,
    StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService]
})
export class ProductModule { }
