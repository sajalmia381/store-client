import { Component, OnInit, inject } from '@angular/core';
import { CartState } from '../state/cart.state';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getCarts, isLoaded } from '../state/cart.selectors';
import { loadCarts, removeCart, removeCartSuccess, removeProductCart } from '../state/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { CartFormComponent } from '../cart-form/cart-form.component';
import { Cart, CartProduct, ProductSpecification } from '../cart';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { setLoading } from '@shared/store/shared.actions';
import { SharedState } from '@shared/store/shared.state';
import { Actions, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart-list',
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss',
    standalone: false
})
export class CartListComponent implements OnInit {
  private store = inject<Store<CartState | SharedState>>(Store);
  private action = inject(Actions);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);

  isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  carts$ = this.store.select(getCarts).pipe(takeUntilDestroyed());

  removeSuccessAction$ = this.action.pipe(ofType(removeCartSuccess), takeUntilDestroyed());

  ngOnInit(): void {
    this.store.dispatch(loadCarts());
    this.removeSuccessAction$.subscribe(res => {
      console.log(res);
      this.snackbar.open('Success, Cart Removed');
    });
  }

  onCartForm(): void {
    this.dialog.open(CartFormComponent, {
      width: '100%',
      maxWidth: '600px',
      disableClose: true
    });
  }

  onUpdate(e: Event, cart: Cart) {
    e.stopPropagation();

    this.dialog.open(CartFormComponent, {
      width: '100%',
      maxWidth: '600px',
      disableClose: true,
      data: cart
    });
  }

  onDelete(e: Event, cart: Cart) {
    e.stopPropagation();

    const dialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: `Are you sure! you want to remove ${cart.user.name} cart?`,
        successBtnText: 'Remove'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(setLoading({ status: true }));
        this.store.dispatch(removeCart({ cartId: cart._id }));
      }
    });
  }

  onRemoveProduct(userId: string, product: CartProduct) {
    const dialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: `Are you sure! you want to remove "${product.title}" product?`,
        successBtnText: 'Remove'
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(setLoading({ status: true }));
        this.store.dispatch(removeProductCart({ userId, productId: product._id }));
      }
    });
  }

  onUpdateProduct(userId: string, product: ProductSpecification) {}
}
