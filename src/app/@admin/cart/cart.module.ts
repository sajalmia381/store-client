import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { CartRoutingModule } from './cart-routing.module';
import { CartService } from './cart.service';
import { StoreModule } from '@ngrx/store';
import { CART_STATE_NAME } from './state/cart.selectors';
import { EffectsModule } from '@ngrx/effects';
import { cartReducer } from './state/cart.reducer';
import { CartEffects } from './state/cart.effects';
import { SharedModule } from '@shared/shared.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartFormComponent } from './cart-form/cart-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductEffects } from '../product/state/product.effects';
import { UserEffects } from '../user/state/user.effects';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CartListComponent, CartFormComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    StoreModule.forFeature(CART_STATE_NAME, cartReducer),
    EffectsModule.forFeature([CartEffects, ProductEffects, UserEffects])
  ],
  providers: [CartService, ProductService, UserService]
})
export class CartModule {}
