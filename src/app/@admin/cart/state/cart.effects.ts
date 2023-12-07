import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as cartAction from './cart.actions';
import { isLoaded } from './cart.selectors';
import { CartService } from '../cart.service';
import { setLoading } from '@shared/store/shared.actions';
import { SharedState } from '@shared/store/shared.state';
import { CartState } from './cart.state';
import { throwError } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(private store: Store<SharedState | CartState>, private action$: Actions, private cartService: CartService) {}

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
            this.store.dispatch(setLoading({ status: false }));
            return cartAction.addOneCartSuccess({ cart });
          })
        );
      })
    );
  });
  updateCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.updateOneCart),
      switchMap(action => {
        return this.cartService.updateCart(action.cartId, action.payload).pipe(
          map((res: any) => {
            const cart = res.data;
            this.store.dispatch(setLoading({ status: false }));
            return cartAction.updateOneCartSuccess({ cart });
          })
        );
      })
    );
  });
  removeCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.removeCart),
      switchMap(({ cartId }) => {
        return this.cartService.deleteCart(cartId).pipe(
          map((res: any) => {
            const cart = res.data;
            console.log('cart', cart);
            this.store.dispatch(setLoading({ status: false }));
            return cartAction.removeCartSuccess({ cartId });
          }),
          catchError(error => {
            this.store.dispatch(setLoading({ status: false }));
            return throwError(error);
          })
        );
      })
    );
  });

  // Request User Action
  updateRequestUserCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.updateProductCart),
      switchMap(action => {
        return this.cartService.updateRequestUserCart(action.payload).pipe(
          map((res: any) => {
            const cart = res.data;
            this.store.dispatch(setLoading({ status: false }));
            return cartAction.updateOneCartSuccess({ cart });
          }),
          catchError(error => {
            this.store.dispatch(setLoading({ status: false }));
            return throwError(error);
          })
        );
      })
    );
  });
  removeProductRequestUserCart$ = createEffect(() => {
    return this.action$.pipe(
      ofType(cartAction.removeProductCart),
      switchMap(({ userId, productId }) => {
        return this.cartService.removeProductRequestUserCart(userId, productId).pipe(
          map((res: any) => {
            const cart = res.data;
            this.store.dispatch(setLoading({ status: false }));
            return cartAction.updateOneCartSuccess({ cart });
          }),
          catchError(error => {
            this.store.dispatch(setLoading({ status: false }));
            return throwError(error);
          })
        );
      })
    );
  });
}
