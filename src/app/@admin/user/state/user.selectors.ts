import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { RouterStateUrl } from 'src/app/store/router/router.serializer';
import { userAdapter, UserState } from './user.state';

export const USER_STATE_NAME = 'users';

export const getUsersState = createFeatureSelector<UserState>(USER_STATE_NAME);
export const userSelectors = userAdapter.getSelectors();

// users
export const getUsers = createSelector(getUsersState, userSelectors.selectAll);
export const getUsersId = createSelector(getUsersState, userSelectors.selectIds);
export const getUsersEntities = createSelector(getUsersState, userSelectors.selectEntities);
export const isLoaded = createSelector(getUsersState, state => state.loaded);

// user
export const getUserById = createSelector(
  getUsersEntities,
  getCurrentRoute,
  (users, route: RouterStateUrl) => {
    return users ? users[route?.params?.id] : null;
  }
);
