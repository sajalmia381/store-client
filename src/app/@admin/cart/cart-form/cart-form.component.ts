import { Component, OnInit, inject } from '@angular/core';
import { CartState } from '../state/cart.state';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductState } from '../../product/state/product.state';
import { UserState } from '../../user/state/user.state';
import { getProducts, isLoaded as isProductLoadSelector } from '../../product/state/product.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getUsers, isLoaded as isUserLoadSelector } from '../../user/state/user.selectors';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { loadUsers } from '../../user/state/user.actions';
import { loadProducts } from '../../product/state/product.actions';
import { addOneCart, addOneCartSuccess, updateOneCart, updateOneCartSuccess } from '../state/cart.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { getLoadingStatus } from '@shared/store/shared.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductSpecification } from '../cart';
import { combineLatest, merge, of } from 'rxjs';
import { getCarts } from '../state/cart.selectors';
import { CustomDuplicateValidators } from '@shared/validations/duplicate.validator';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.scss'
})
export class CartFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store: Store<CartState | ProductState | UserState | ShareData> = inject(Store);
  private action$ = inject(Actions);
  public data?: any = inject(MAT_DIALOG_DATA);
  private snackbar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef<CartFormComponent>)

  users$ = this.store.select(getUsers).pipe(
    takeUntilDestroyed(),
    withLatestFrom(this.store.select(getCarts).pipe(map(carts => carts.map(cart => cart.user._id)))),
    map(([users, cartUserIds]) => {
      return users.filter(user => !cartUserIds.includes(user._id));
    })
  );
  products$ = this.store.select(getProducts).pipe(takeUntilDestroyed());

  isUserLoaded$ = this.store.select(isUserLoadSelector).pipe(takeUntilDestroyed());
  isProductLoaded$ = this.store.select(isProductLoadSelector).pipe(takeUntilDestroyed());

  isDependencyLoading$ = of(this.data).pipe(
    takeUntilDestroyed(),
    switchMap(data => {
      if (data) return this.store.select(isProductLoadSelector);
      return combineLatest([this.store.select(isUserLoadSelector), this.store.select(isProductLoadSelector)]).pipe(
        map(([user, product]) => user && product)
      );
    })
  );

  isSharedLoading$ = this.store.select(getLoadingStatus).pipe(takeUntilDestroyed());

  isSumitting!: boolean;
  successAction$ = merge(
    this.action$.pipe(ofType(addOneCartSuccess)),
    this.action$.pipe(ofType(updateOneCartSuccess))
  ).pipe(takeUntilDestroyed());

  form: FormGroup = this.fb.group({
    products: this.fb.array([], [CustomDuplicateValidators('productId')])
  });

  get productsArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  productSpecGroup(productSpec?: ProductSpecification): FormGroup {
    const formGroup = this.fb.group({
      productId: ['', [Validators.required]],
      quantity: [1, [Validators.required]]
    });
    if (productSpec) {
      formGroup.patchValue({
        productId: productSpec.product._id,
        quantity: productSpec.quantity
      });
    }
    return formGroup;
  }

  addProductSpec(productSpec?: ProductSpecification): void {
    (<FormArray>this.form.get('products')).push(this.productSpecGroup(productSpec));
  }

  removeProductSpec(index: number): void {
    (<FormArray>this.form.get('products')).removeAt(index);
  }

  ngOnInit(): void {
    this.isSharedLoading$.subscribe(isLoading => (this.isSumitting = isLoading));

    if (this.data) {
      const { products } = this.data;
      if (products?.length) {
        products.forEach((spec: ProductSpecification) => {
          this.addProductSpec(spec)
        });
      }
    } else {
      this.form.addControl('userId', this.fb.control('', [Validators.required]));
      this.addProductSpec();
    }

    if (!this.data) {
      this.isUserLoaded$
        .pipe(
          take(1),
          filter((val: boolean) => !val)
        )
        .subscribe(() => {
          this.store.dispatch(loadUsers());
        });
    }
    this.isProductLoaded$
      .pipe(
        take(1),
        filter((val: boolean) => !val)
      )
      .subscribe(() => {
        this.store.dispatch(loadProducts({}));
      });

    this.successAction$.subscribe(() => {
      // if (this.data) {
      // } else {
      //   this.form.reset({quantity: 1});
      //   this.form.markAsPristine();
      //   this.form.markAsUntouched();
      //   this.form.clearValidators();
      //   this.form.updateValueAndValidity();
      // }
      this.dialogRef.close();
      this.snackbar.open(`Success! Cart ${this.data ? 'Updated' : 'Added'}`, 'Close', { duration: 4000 });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    this.store.dispatch(setLoading({ status: true }));
    console.log('this.data' ,this.data)
    if (this.data) {
      this.store.dispatch(updateOneCart({ cartId: this.data._id,  payload: this.form.value }));
      return 
    }

    this.store.dispatch(addOneCart({ payload: this.form.value }));
  }
}
