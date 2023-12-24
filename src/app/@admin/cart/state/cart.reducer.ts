import { Action, createReducer, on } from '@ngrx/store';
import { addOneCartSuccess, loadCartsSuccess, removeCartSuccess, updateOneCartSuccess } from './cart.actions';
import { initialState, cartAdapter, CartState } from './cart.state';

const _cartReducer = createReducer(
  initialState,
  on(loadCartsSuccess, (state, action) => {
    return cartAdapter.setAll(action.carts, {
      ...state,
      loaded: true
    });
  }),
  on(addOneCartSuccess, (state, action) => {
    return cartAdapter.addOne(action.cart, state);
  }),
  on(updateOneCartSuccess, (state, action) => {
    return cartAdapter.updateOne(action.update, state);
  }),
  on(removeCartSuccess, (state, action) => {
    return cartAdapter.removeOne(action.cartId, state);
  })
);

export const cartReducer = (state: CartState | undefined, action: Action) => {
  return _cartReducer(state, action);
};
