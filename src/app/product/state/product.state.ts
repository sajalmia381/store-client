import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../product';

export interface ProductState extends EntityState<Product> {
  loaded: boolean;
}

export const productAdapter = createEntityAdapter<Product>({
  selectId: (product: Product) => product.slug,
});

export const initialState = productAdapter.getInitialState({
  loaded: false
});
