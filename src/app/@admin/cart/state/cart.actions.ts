import { createAction, props } from '@ngrx/store';
import { Cart, CartFormPayload } from '../cart';

export const LOAD_CARTS = '[cart] load carts';
export const ADD_CART = '[cart] add cart';
export const ADD_ONE_CART = '[cart] add one cart';
export const ADD_ONE_CART_SUCCESS = '[cart] add one cart success';

export const loadCarts = createAction(LOAD_CARTS);
export const loadCartsSuccess = createAction(
  ADD_CART,
  props<{ carts: Cart[] }>()
);
export const addOneCart = createAction(ADD_ONE_CART, props<{ payload: CartFormPayload }>());
export const addOneCartSuccess = createAction(
  ADD_ONE_CART_SUCCESS,
  props<{ cart: Cart }>()
);
export const dummyAction = createAction('[Cart] dummy action');
