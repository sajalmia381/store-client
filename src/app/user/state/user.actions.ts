import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { User } from "../user";

const LOAD_USERS = '[user] load users';
const LOAD_USERS_SUCCESS = '[user] load users success';
const ADD_ONE_USER = '[user] add user';
const UPDATE_USER = '[user] update user';
const UPDATE_USER_SUCCESS = '[user] update user success';
const DELETE_USER = '[user] delete user request';
const DELETE_USER_SUCCESS = '[user] delete user success';
export const loadUsers = createAction(LOAD_USERS)
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users: User[]}>())

export const addOneUser = createAction(ADD_ONE_USER, props<{user: User}>());
export const updateUser = createAction(UPDATE_USER, props<{user: User}>());
export const updateUserSuccess = createAction(
  UPDATE_USER_SUCCESS,
  props<{ user: Update<User> }>()
);
export const deleteUser = createAction(DELETE_USER, props<{id: string}>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{id: string}>());

export const dummyAction = createAction('[product] dummy action');