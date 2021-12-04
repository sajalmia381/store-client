import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { RouterStateUrl } from 'src/app/store/router/router.serializer';
import { categoryAdapter, CategoryState } from './category.state';

export const CATEGORY_STATE_NAME = 'categories';

export const getCategoryState = createFeatureSelector<CategoryState>(CATEGORY_STATE_NAME);
export const CategorySelectors = categoryAdapter.getSelectors();

// Category
export const getCategories = createSelector(getCategoryState, CategorySelectors.selectAll);
export const getCategorySlugs = createSelector(getCategoryState, CategorySelectors.selectIds);
export const getCategoryEntities = createSelector(
  getCategoryState,
  CategorySelectors.selectEntities
);
export const isLoaded = createSelector(getCategoryState, state => state.loaded);

// Category
export const getCategoryBySlug = createSelector(
  getCategoryEntities,
  getCurrentRoute,
  (categories, route: RouterStateUrl) => {
    return categories ? categories[route?.params?.slug] : null;
  }
);
