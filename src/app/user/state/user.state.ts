import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from "../user";


export interface UserState extends EntityState<User> {
  // add extra fields
  loaded: boolean;
}

export const userAdapter = createEntityAdapter<User>({
  // adds extra
});

export const initialState = userAdapter.getInitialState({
  loaded: false
});