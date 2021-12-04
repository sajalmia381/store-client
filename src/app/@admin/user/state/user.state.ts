import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../user';

export interface UserState extends EntityState<User> {
  // add extra fields
  loaded: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  // adds extra
  selectId: (user: User) => user._id
});

export const initialState: UserState = userAdapter.getInitialState({
  loaded: false
});
