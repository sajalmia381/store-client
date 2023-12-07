import { Component, OnInit, inject } from '@angular/core';
import { CartState } from '../state/cart.state';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getCarts, isLoaded } from '../state/cart.selectors';
import { loadCarts, removeCart } from '../state/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { CartFormComponent } from '../cart-form/cart-form.component';
import { Cart, CartProduct } from '../cart';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { setLoading } from '@shared/store/shared.actions';
import { SharedState } from '@shared/store/shared.state';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  private store = inject<Store<CartState | SharedState>>(Store);
  private dialog = inject(MatDialog);

  isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  carts$ = this.store.select(getCarts).pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.store.dispatch(loadCarts());
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
        // this.store.dispatch(removeCart({ payload: { , productId: product._id } }));
      }
    });
  }

  // onRemoveCart(cartId: string) {
  //   const dialogRef = this.dialog.open(DeleteConformationComponent, {
  //     width: '100%',
  //     maxWidth: '400px',
  //     data: {
  //       message: `Are you sure! you want to remove "${product.title}" product?`,
  //       successBtnText: "Remove"
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
  //     if (confirmed) {
  //       this.store.dispatch(setLoading({status: true}))
  //       // this.store.dispatch(removeCart({ payload: { , productId: product._id } }));
  //     }
  //   });
  // }
}
