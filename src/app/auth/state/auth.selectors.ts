import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isSignedIn = createSelector(getAuthState, state => {
  return state.isSignedIn;
});

export const getToken = createSelector(getAuthState, state => {
  return state?.userData?.access_token || null;
});

export const getUserData = createSelector(getAuthState, state => {
  return state?.userData || null;
});

export const getLoginErrors = createSelector(getAuthState, state => {
  return state?.errors || null;
});
