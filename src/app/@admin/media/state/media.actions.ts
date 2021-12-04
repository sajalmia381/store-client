import { createAction, props } from '@ngrx/store';
import { Image } from '../Image';

export const LOAD_IMAGES = '[media] load images';
export const LOAD_IMAGES_SUCCESS = '[media] load images success';
export const ADD_IMAGE = '[media] add image';
export const ADD_IMAGE_SUCCESS = '[media] add image success';
export const LOAD_IMAGE = '[media] load image';
export const DELETE_IMAGE = '[media] delete image';
export const DELETE_IMAGE_SUCCESS = '[media] delete image success';

// Bulk
export const BULK_DELETE_IMAGE = '[media] bulk images delete';
export const BULK_DELETE_IMAGE_SUCCESS = '[media] bulk images delete success';

export const loadImages = createAction(LOAD_IMAGES);
export const loadImagesSuccess = createAction(LOAD_IMAGES_SUCCESS, props<{ images: Image[] }>());
export const loadImage = createAction(LOAD_IMAGE);
export const addImage = createAction(ADD_IMAGE, props<{ image: any }>());
export const addImageSuccess = createAction(ADD_IMAGE_SUCCESS, props<{ image: Image }>());
export const deleteImage = createAction(DELETE_IMAGE, props<{ id: string }>());
export const deleteImageSuccess = createAction(DELETE_IMAGE_SUCCESS, props<{ id: string }>());
// bulk
export const bulkDeleteImages = createAction(BULK_DELETE_IMAGE, props<{ slugs: string[] }>());
export const bulkDeleteImagesSuccess = createAction(
  BULK_DELETE_IMAGE_SUCCESS,
  props<{ slugs: string[] }>()
);
export const dummyAction = createAction('[media] dummy action');
