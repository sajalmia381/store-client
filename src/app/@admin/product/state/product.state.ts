import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../product';

export interface ProductState extends EntityState<Product> {
  loaded: boolean;
}

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.slug
});

export const initialState: ProductState = productAdapter.getInitialState({
  loaded: false
});
