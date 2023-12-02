import { Component, OnInit, inject } from '@angular/core';
import { CartState } from '../state/cart.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user';
import { Product } from '../../product/product';
import { ProductState } from '../../product/state/product.state';
import { UserState } from '../../user/state/user.state';
import {
  getProducts,
  isLoaded as isProductLoadSelector
} from '../../product/state/product.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getUsers, isLoaded as isUserLoadSelector } from '../../user/state/user.selectors';
import { filter, take } from 'rxjs/operators';
import { loadUsers } from '../../user/state/user.actions';
import { loadProducts } from '../../product/state/product.actions';
import { addOneCart } from '../state/cart.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.scss'
})
export class CartFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store: Store<CartState | ProductState | UserState> = inject(Store);
  public data?: any = inject(MAT_DIALOG_DATA);

  users$ = this.store.select(getUsers).pipe(takeUntilDestroyed());
  products$ = this.store.select(getProducts).pipe(takeUntilDestroyed());

  isUserLoaded$ = this.store.select(isUserLoadSelector).pipe(takeUntilDestroyed());
  isProductLoaded$ = this.store.select(isProductLoadSelector).pipe(takeUntilDestroyed());

  form: FormGroup = this.fb.group({
    userId: ['', [Validators.required]],
    productId: ['', [Validators.required]],
    quantity: [1, [Validators.required]]
  });

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        userId: this.data.userId,
        productId: this.data.spec?.product?._id,
        quantity: this.data.spec?.quantity
      });
    }
    this.isUserLoaded$
      .pipe(
        take(1),
        filter((val: boolean) => !val)
      )
      .subscribe(() => {
        this.store.dispatch(loadUsers());
      });

    this.isProductLoaded$
      .pipe(
        take(1),
        filter((val: boolean) => !val)
      )
      .subscribe(() => {
        this.store.dispatch(loadProducts({}));
      });
  }

  onSubmit(): void {
    this.store.dispatch(addOneCart({ payload: this.form.value }));
  }
}
