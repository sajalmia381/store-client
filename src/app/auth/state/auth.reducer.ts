import { Action, createReducer, on } from '@ngrx/store';
import { logoutSuccess, loginSuccess, setLoginError } from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    const { userData } = action;
    return { ...state, isSignedIn: true, userData, errors: {} };
  }),
  on(logoutSuccess, () => {
    localStorage.removeItem('requester');
    return { isSignedIn: false, userData: null, errors: {} };
  }),
  on(setLoginError, (state, action) => {
    return { ...state, errors: action.payload };
  })
);

export const authReducer = (state: AuthState | undefined, action: Action) => {
  return _authReducer(state, action);
};
