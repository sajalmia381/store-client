import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Cart } from '../cart';

export interface CartState extends EntityState<Cart> {
  loaded: boolean;
}

export const cartAdapter: EntityAdapter<Cart> = createEntityAdapter<Cart>({
  selectId: (cart: Cart) => cart._id
});

export const initialState: CartState = cartAdapter.getInitialState({
  loaded: false
});
