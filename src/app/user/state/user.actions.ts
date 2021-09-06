import { createAction, props } from "@ngrx/store";
import { User } from "../user";

const LOAD_USERS = '[user] load users';
const LOAD_USERS_SUCCESS = '[user] load users success';

export const loadUsers = createAction(LOAD_USERS)
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users: User[]}>())