import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../category';

export interface CategoryState extends EntityState<Category> {
  loaded: boolean;
}

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (category: Category) => category.slug,
});

export const initialState: CategoryState = categoryAdapter.getInitialState({
  loaded: false
});