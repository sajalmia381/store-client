import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todoAdapter, TodoState } from './todo.state';

export const TODO_STATE_NAME = 'todos';

export const getTodoState = createFeatureSelector<TodoState>(TODO_STATE_NAME);
export const TodoSelectors = todoAdapter.getSelectors();

// Category
export const getTodos = createSelector(getTodoState, TodoSelectors.selectAll);
export const getTodoEntities = createSelector(
  getTodoState,
  TodoSelectors.selectEntities
);
export const isLoaded = createSelector(getTodoState, state => state.loaded);

