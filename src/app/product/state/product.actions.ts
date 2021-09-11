import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const LOAD_PRODUCTS = '[product] load products';
export const ADD_PRODUCTS = '[product] add products';
export const ADD_ONE_PRODUCT = '[product] add one product';
export const LOAD_PRODUCT = '[product] load product';
export const DELETE_PRODUCT = '[product] delete product';
export const DELETE_PRODUCT_SUCCESS = '[product] delete product success';
export const UPDATE_PRODUCT = '[product] update product';
export const UPDATE_PRODUCT_SUCCESS = '[product] update product success';

export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProductsSuccess = createAction(ADD_PRODUCTS, props<{ products: Product[] }>());
export const loadProduct = createAction(LOAD_PRODUCT);
export const addOneProduct = createAction(ADD_ONE_PRODUCT, props<{ product: Product }>());
export const updateProduct = createAction(UPDATE_PRODUCT, props<{ product: Product }>());
export const updateProductSuccess = createAction(
  UPDATE_PRODUCT_SUCCESS,
  props<{ product: Update<Product> }>()
);
export const deleteProduct = createAction(DELETE_PRODUCT, props<{ id: string }>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{ id: string }>());

export const dummyAction = createAction('[product] dummy action');
