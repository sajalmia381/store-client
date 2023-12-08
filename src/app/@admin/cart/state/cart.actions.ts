import { createAction, props } from '@ngrx/store';
import { Cart, CartFormPayload, RequestUserCartPayload } from '../cart';
import { Update } from '@ngrx/entity';

export const LOAD_CARTS = '[cart] load carts';
export const ADD_CART = '[cart] add cart';
export const ADD_ONE_CART = '[cart] add one cart';
export const ADD_ONE_CART_SUCCESS = '[cart] add one cart success';
export const UPDATE_ONE_CART = '[cart] update one cart';
export const UPDATE_ONE_CART_SUCCESS = '[cart] update one cart success';
export const REMOVE_CART = '[cart] remove cart';
export const REMOVE_CART_SUCCESS = '[cart] remove cart success';
export const UPDATE_PRODUCT_CART = '[cart] update product from cart';
export const REMOVE_PRODUCT_CART = '[cart] remove product from cart';

export const loadCarts = createAction(LOAD_CARTS);
export const loadCartsSuccess = createAction(ADD_CART, props<{ carts: Cart[] }>());

export const addOneCart = createAction(ADD_ONE_CART, props<{ payload: CartFormPayload }>());
export const addOneCartSuccess = createAction(ADD_ONE_CART_SUCCESS, props<{ cart: Cart }>());

export const updateOneCart = createAction(UPDATE_ONE_CART, props<{ cartId: string; payload: Pick<CartFormPayload, 'products'> }>()); // update cart
export const updateOneCartSuccess = createAction(UPDATE_ONE_CART_SUCCESS, props<{ update: Update<Cart> }>()); // update cart Success

export const removeCart = createAction(REMOVE_CART, props<{ cartId: string }>());
export const removeCartSuccess = createAction(REMOVE_CART_SUCCESS, props<{ cartId: string }>());

export const updateProductCart = createAction(UPDATE_PRODUCT_CART, props<{ payload: RequestUserCartPayload }>()); // update cart
export const removeProductCart = createAction(REMOVE_PRODUCT_CART, props<{ userId: string, productId: string }>()); // update cart

export const dummyAction = createAction('[Cart] dummy action');
