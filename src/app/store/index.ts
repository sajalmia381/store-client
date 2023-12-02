import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer } from '../v0/auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../v0/auth/state/auth.selectors';
import { AuthState } from '../v0/auth/state/auth.state';
import { categoryReducer } from '../@admin/category/state/category.reducer';
import { CATEGORY_STATE_NAME } from '../@admin/category/state/category.selectors';
import { CategoryState } from '../@admin/category/state/category.state';
import { imageReducer } from '../@admin/media/state/media.reducer';
import { IMAGE_STATE_NAME } from '../@admin/media/state/media.selectors';
import { ImageState } from '../@admin/media/state/media.state';
import { ROUTER_STATE_NAME } from './router/router.selectors';
import { sharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';
import { PRODUCT_STATE_NAME } from '../@admin/product/state/product.selectors';
import { ProductState } from '../@admin/product/state/product.state';
import { USER_STATE_NAME } from '../@admin/user/state/user.selectors';
import { UserState } from '../@admin/user/state/user.state';
import { productReducer } from '../@admin/product/state/product.reducer';
import { userReducer } from '../@admin/user/state/user.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [ROUTER_STATE_NAME]: RouterReducerState;
  [AUTH_STATE_NAME]: AuthState;
  [CATEGORY_STATE_NAME]: CategoryState;
  [IMAGE_STATE_NAME]: ImageState;
  [PRODUCT_STATE_NAME]: ProductState;
  [USER_STATE_NAME]: UserState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [ROUTER_STATE_NAME]: routerReducer,
  [AUTH_STATE_NAME]: authReducer,
  [CATEGORY_STATE_NAME]: categoryReducer,
  [IMAGE_STATE_NAME]: imageReducer,
  [PRODUCT_STATE_NAME]: productReducer,
  [USER_STATE_NAME]: userReducer
};
