import { Action, createReducer, on } from '@ngrx/store';
import {
  addOneTodoSuccess,
  loadCategoriesSuccess,
} from './todo.actions';
import { initialState, todoAdapter, TodoState } from './todo.state';

const _todoReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, action) => {
    return todoAdapter.setAll(action.todos, {
      ...state,
      loaded: true
    });
  }),
  on(addOneTodoSuccess, (state, action) => {
    return todoAdapter.addOne(action.todo, state);
  })
);

export const todoReducer = (state: TodoState | undefined, action: Action) => {
  return _todoReducer(state, action);
};
