import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { RouterStateUrl } from 'src/app/store/router/router.serializer';
import { imageAdapter, ImageState } from './media.state';

export const IMAGE_STATE_NAME = 'images';

export const getImageState = createFeatureSelector<ImageState>(IMAGE_STATE_NAME);
export const imageSelectors = imageAdapter.getSelectors();

// image
export const getImages = createSelector(getImageState, imageSelectors.selectAll);
export const getImageIds = createSelector(getImageState, imageSelectors.selectIds);
export const getImageEntities = createSelector(getImageState, imageSelectors.selectEntities);
export const isLoaded = createSelector(getImageState, state => state.loaded);

// Image
export const getImageById = createSelector(
  getImageEntities,
  getCurrentRoute,
  (images, route: RouterStateUrl) => {
    return images ? images[route?.params?.id] : null;
  }
);
