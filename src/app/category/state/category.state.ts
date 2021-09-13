import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../category';

export interface CategoryState extends EntityState<Category> {
  loaded: boolean;
}

export const categoryAdapter = createEntityAdapter<Category>({
  selectId: (category: Category) => category.slug,
});

export const initialState = categoryAdapter.getInitialState({
  loaded: false
});