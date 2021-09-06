import { Action, createReducer, on } from '@ngrx/store';
import { setLoading } from './shared.actions';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoading, (state, action) => {
    return { ...state, loading: action.status };
  })
);

export const sharedReducer = (state: SharedState | undefined, action: Action) => {
  return _sharedReducer(state, action);
};
