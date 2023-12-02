import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as cartAction from './cart.actions';
import { isLoaded } from './cart.selectors';
import { CartService } from '../cart.service';

@Injectable()
export class CartEffects {
  constructor(private store: Store, private action$: Actions, private cartService: CartService) {}

  loadCarts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.loadCarts),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.cartService.getCarts().pipe(
          map(carts => {
            return cartAction.loadCartsSuccess({ carts });
          })
        );
      })
    );
  });

  addCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.addOneCart),
      switchMap(action => {
        return this.cartService.addCart(action.payload).pipe(
          map((res: any) => {
            const cart = res.data;
            return cartAction.addOneCartSuccess({ cart });
          })
        );
      })
    );
  });
}
