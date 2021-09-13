import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Category } from '../category';

export const LOAD_CATEGORIES = '[category] load categories';
export const ADD_CATEGORIES = '[category] add categories';
export const ADD_ONE_CATEGORY = '[category] add one category';
export const LOAD_CATEGORY = '[category] load category';
export const DELETE_CATEGORY = '[category] delete category';
export const DELETE_CATEGORY_SUCCESS = '[category] delete category success';
export const UPDATE_CATEGORY = '[category] update category';
export const UPDATE_CATEGORY_SUCCESS = '[category] update category success';

export const loadCategories = createAction(LOAD_CATEGORIES);
export const loadCategoriesSuccess = createAction(ADD_CATEGORIES, props<{ categories: Category[] }>());
export const loadCategory = createAction(LOAD_CATEGORY);
export const addOneCategory = createAction(ADD_ONE_CATEGORY, props<{ category: Category }>());
export const updateCategory = createAction(UPDATE_CATEGORY, props<{ category: Category }>());
export const updateCategorySuccess = createAction(
  UPDATE_CATEGORY_SUCCESS,
  props<{ category: Update<Category> }>()
);
export const deleteCategory = createAction(DELETE_CATEGORY, props<{ id: string }>());
export const deleteCategorySuccess = createAction(DELETE_CATEGORY_SUCCESS, props<{ id: string }>());

export const dummyAction = createAction('[Category] dummy action');
