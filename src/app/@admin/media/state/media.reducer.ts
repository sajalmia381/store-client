import { Action, createReducer, on } from '@ngrx/store';
import { addImageSuccess, deleteImageSuccess, loadImagesSuccess } from './media.actions';
import { initialState, imageAdapter, ImageState } from './media.state';

const _imageReducer = createReducer(
  initialState,
  on(loadImagesSuccess, (state, action) => {
    return imageAdapter.setAll(action.images, {
      ...state,
      loaded: true
    });
  }),
  on(addImageSuccess, (state, action) => {
    return imageAdapter.addOne(action.image, state);
  }),
  on(deleteImageSuccess, (state, action) => {
    return imageAdapter.removeOne(action.id, state);
  })
);

export const imageReducer = (state: ImageState | undefined, action: Action) => {
  return _imageReducer(state, action);
};
