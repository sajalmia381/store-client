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
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserService } from '../user/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ProductUpdateComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSidenavModule,
    ReactiveFormsModule,
    StoreModule.forFeature(PRODUCT_STATE_NAME, productReducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  providers: [ProductService, UserService]
})
export class ProductModule { }
