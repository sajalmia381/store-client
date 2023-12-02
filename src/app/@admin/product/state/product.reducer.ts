import { Action, createReducer, on } from '@ngrx/store';
import {
  addProductSuccess,
  deleteProductSuccess,
  loadProductsSuccess,
  updateProductSuccess
} from './product.actions';
import { initialState, productAdapter, ProductState } from './product.state';

const _productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return productAdapter.setAll(action.products, {
      ...state,
      loaded: true
    });
  }),
  on(addProductSuccess, (state, action) => {
    return productAdapter.addOne(action.product, state);
  }),
  on(updateProductSuccess, (state, action) => {
    return productAdapter.updateOne(action.product, state);
  }),
  on(deleteProductSuccess, (state, action) => {
    return productAdapter.removeOne(action.id, state);
  })
);

export const productReducer = (state: ProductState | undefined, action: Action) => {
  return _productReducer(state, action);
};
