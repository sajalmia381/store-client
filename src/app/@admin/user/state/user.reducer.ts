import { Action, createReducer, on } from '@ngrx/store';
import { addUserSuccess, deleteUserSuccess, loadUsersSuccess, updateUserSuccess } from './user.actions';
import { initialState, userAdapter, UserState } from './user.state';

const _userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => {
    console.log('reducer state');
    return userAdapter.setAll(users, {
      ...state,
      loaded: true
    });
  }),

  on(addUserSuccess, (state, action) => {
    return userAdapter.addOne(action.user, state);
  }),
  on(updateUserSuccess, (state, action) => {
    return userAdapter.updateOne(action.user, state);
  }),
  on(deleteUserSuccess, (state, action) => {
    return userAdapter.removeOne(action.id, state);
  })
);

export const userReducer = (state: UserState | undefined, action: Action) => {
  return _userReducer(state, action);
};
