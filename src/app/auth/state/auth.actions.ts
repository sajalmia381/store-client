import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login request',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ userData: any; redirect: boolean }>()
);
export const logoutSuccess = createAction('[Auth] Logout success');

export const setLoginError = createAction(
  '[Auth] Set login error',
  props<{ payload: { username?: string; password?: string } }>()
);
