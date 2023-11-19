import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '../todo';

export interface TodoState extends EntityState<Todo> {
  loaded: boolean;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (category: Todo) => category._id
});

export const initialState: TodoState = todoAdapter.getInitialState({
  loaded: false
});
