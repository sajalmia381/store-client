import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartAdapter, CartState } from './cart.state';

export const CART_STATE_NAME = 'carts';

export const getCartState = createFeatureSelector<CartState>(CART_STATE_NAME);
export const CartSelectors = cartAdapter.getSelectors();

// Category
export const getCarts = createSelector(getCartState, CartSelectors.selectAll);
export const getCartEntities = createSelector(
  getCartState,
  CartSelectors.selectEntities
);

export const isLoaded = createSelector(getCartState, state => state.loaded);