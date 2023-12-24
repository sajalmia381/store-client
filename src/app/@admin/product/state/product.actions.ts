import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const LOAD_PRODUCTS = '[product] load products';
export const LOAD_PRODUCTS_SUCCESS = '[product] load products success';
export const ADD_PRODUCT = '[product] add product';
export const ADD_PRODUCT_SUCCESS = '[product] add product success';
export const LOAD_PRODUCT = '[product] load product';
export const DELETE_PRODUCT = '[product] delete product';
export const DELETE_PRODUCT_SUCCESS = '[product] delete product success';
export const UPDATE_PRODUCT = '[product] update product';
export const UPDATE_PRODUCT_SUCCESS = '[product] update product success';
// Bulk
export const BULK_DELETE_PRODUCT = '[product] bulk products delete';
export const BULK_DELETE_PRODUCT_SUCCESS = '[product] bulk products delete success';

export const loadProducts = createAction(LOAD_PRODUCTS, props<{ queryParams?: any }>());
export const loadProductsSuccess = createAction(LOAD_PRODUCTS_SUCCESS, props<{ products: Product[] }>());
export const loadProduct = createAction(LOAD_PRODUCT);
export const addProduct = createAction(ADD_PRODUCT, props<{ product: Product }>());
export const addProductSuccess = createAction(ADD_PRODUCT_SUCCESS, props<{ product: Product }>());
export const updateProduct = createAction(UPDATE_PRODUCT, props<{ product: Product }>());
export const updateProductSuccess = createAction(UPDATE_PRODUCT_SUCCESS, props<{ product: Update<Product> }>());
export const deleteProduct = createAction(DELETE_PRODUCT, props<{ id: string }>());
export const deleteProductSuccess = createAction(DELETE_PRODUCT_SUCCESS, props<{ id: string }>());
// bulk
export const bulkDeleteProducts = createAction(BULK_DELETE_PRODUCT, props<{ slugs: string[] }>());
export const bulkDeleteProductsSuccess = createAction(BULK_DELETE_PRODUCT_SUCCESS, props<{ slugs: string[] }>());
export const dummyAction = createAction('[product] dummy action');
