import { Component, OnInit, inject } from '@angular/core';
import { CartState } from '../state/cart.state';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getCarts, isLoaded } from '../state/cart.selectors';
import { loadCarts } from '../state/cart.actions';
import { MatDialog } from '@angular/material/dialog';
import { CartFormComponent } from '../cart-form/cart-form.component';
import { Cart, ProductSpecification } from '../cart';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit {
  private store = inject<Store<CartState>>(Store);
  private dialog = inject(MatDialog);

  isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  carts$ = this.store.select(getCarts).pipe(takeUntilDestroyed());

  ngOnInit(): void {
    this.store.dispatch(loadCarts());
  }

  onCartForm(): void {
    this.dialog.open(CartFormComponent, {
      width: '100%',
      maxWidth: '500px'
    })
  }

  onUpdateCart(userId: string, productSpec: ProductSpecification) {
    const dialogRef = this.dialog.open(CartFormComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        userId,
        spec: productSpec
      }
    })
  }

  onRemoveProduct(userId: string, productId: string) {

  }
}
