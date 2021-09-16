import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { authReducer } from '../auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/state/auth.selectors';
import { AuthState } from '../auth/state/auth.state';
import { categoryReducer } from '../category/state/category.reducer';
import { CATEGORY_STATE_NAME } from '../category/state/category.selectors';
import { CategoryState } from '../category/state/category.state';
import { ROUTER_STATE_NAME } from './router/router.selectors';
import { sharedReducer } from './shared/shared.reducer';
import { SHARED_STATE_NAME } from './shared/shared.selectors';
import { SharedState } from './shared/shared.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [ROUTER_STATE_NAME]: RouterReducerState;
  [AUTH_STATE_NAME]: AuthState;
  [CATEGORY_STATE_NAME]: CategoryState
}

export const appReducer = {
  [SHARED_STATE_NAME]: sharedReducer,
  [ROUTER_STATE_NAME]: routerReducer,
  [AUTH_STATE_NAME]: authReducer,
  [CATEGORY_STATE_NAME]: categoryReducer
};
