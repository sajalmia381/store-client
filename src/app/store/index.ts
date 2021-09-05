import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ROUTER_STATE_NAME } from './router/router.selectors';

export interface AppState {
  [ROUTER_STATE_NAME]: RouterReducerState;
}

export const AppReducer = {
  [ROUTER_STATE_NAME]: routerReducer
};
