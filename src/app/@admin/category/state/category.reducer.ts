import { Action, createReducer, on } from '@ngrx/store';
import {
  addOneCategorySuccess,
  deleteCategorySuccess,
  loadCategoriesSuccess,
  updateCategorySuccess
} from './category.actions';
import { initialState, categoryAdapter, CategoryState } from './category.state';

const _categoryReducer = createReducer(
  initialState,
  on(loadCategoriesSuccess, (state, action) => {
    return categoryAdapter.setAll(action.categories, {
      ...state,
      loaded: true
    });
  }),
  on(addOneCategorySuccess, (state, action) => {
    return categoryAdapter.addOne(action.category, state);
  }),
  on(updateCategorySuccess, (state, action) => {
    return categoryAdapter.updateOne(action.category, state);
  }),
  on(deleteCategorySuccess, (state, action) => {
    return categoryAdapter.removeOne(action.id, state);
  })
);

export const categoryReducer = (state: CategoryState | undefined, action: Action) => {
  return _categoryReducer(state, action);
};
