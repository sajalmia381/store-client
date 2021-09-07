import { Action, createReducer, on } from "@ngrx/store";
import { loadUsersSuccess } from "./user.actions";
import { initialState, userAdapter, UserState } from "./user.state";

const _userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, {users}) => {
    console.log('reducer state')
    return userAdapter.setAll(users, {
      ...state,
      loaded: true
    });
  }),
)

export const userReducer = (state: UserState, action: Action) => {
  return _userReducer(state, action)
}