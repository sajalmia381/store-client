import { createAction, props } from '@ngrx/store';
import { Todo } from '../todo';

export const LOAD_TODOS = '[todo] load todos';
export const ADD_TODO = '[todo] add todo';
export const ADD_ONE_TODO = '[todo] add one todo';
export const ADD_ONE_TODO_SUCCESS = '[todo] add one todo success';

export const loadCategories = createAction(LOAD_TODOS);
export const loadCategoriesSuccess = createAction(
  ADD_TODO,
  props<{ todos: Todo[] }>()
);
export const loadTodos = createAction(LOAD_TODOS);
export const addOneTodo = createAction(ADD_ONE_TODO, props<{ todo: Pick<Todo, "title" | "completed"> }>());
export const addOneTodoSuccess = createAction(
  ADD_ONE_TODO_SUCCESS,
  props<{ todo: Todo }>()
);
export const dummyAction = createAction('[Todo] dummy action');
