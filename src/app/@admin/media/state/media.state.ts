import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Image } from '../Image';

export interface ImageState extends EntityState<Image> {
  loaded: boolean;
}

export const imageAdapter: EntityAdapter<Image> = createEntityAdapter<Image>({
  selectId: (image: Image) => image._id,
});

export const initialState: ImageState = imageAdapter.getInitialState({
  loaded: false
});
