import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isSignedIn = createSelector(getAuthState, state => {
  return state.isSignedIn;
});

export const getAccessToken = createSelector(getAuthState, state => {
  return state?.userData?.access_token || null;
});

export const getRefreshToken = createSelector(getAuthState, state => {
  return state?.userData?.refresh_token || null;
});

export const getUserData = createSelector(getAuthState, state => {
  return state?.userData || null;
});

export const isSuperAdmin = createSelector(getAuthState, state => {
  return state?.userData?.userInfo?.role === 'ROLE_SUPER_ADMIN';
});

export const getLoginErrors = createSelector(getAuthState, state => {
  return state?.errors || null;
});
