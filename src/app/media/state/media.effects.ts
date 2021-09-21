import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as imageAction from './media.actions';
import { getImageIds, isLoaded } from './media.selectors';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { ImageService } from '../image.service';

@Injectable()
export class ImageEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private imageService: ImageService
  ) { }
  loadImages$ = createEffect(() => {
    return this.action$.pipe(
      ofType(imageAction.loadImages),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.imageService.getImages().pipe(
          map(images => {
            return imageAction.loadImagesSuccess({ images });
          })
        );
      })
    );
  });
  loadSingleImage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(imageAction.loadImage),
      withLatestFrom(this.store.select(getCurrentRoute), this.store.select(getImageIds)),
      switchMap(([action, route, ids]) => {
        const id = route.params.id;
        const isIdExists = ids.some(_id => _id === id)
        if (!isIdExists) {
          return this.imageService.getImage(id).pipe(
            map((res: any) => {
              const image = { ...res?.data, id };
              return imageAction.addImageSuccess({ image });
            })
          );
        }
        return of(imageAction.dummyAction());
      })
    );
  });
  addImage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(imageAction.addImage),
      switchMap((action) => {
        return this.imageService.addImage(action.image).pipe(
          map((res: any) => {
            console.log('add image call', res)
            const image = { ...res.data, id: res.data?._id };
            return imageAction.addImageSuccess({ image });
          })
        );
      })
    );
  });
  // addUser$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(userAction.addUser),
  //     switchMap((action) => {
  //       return this.userService.addUser(action.user).pipe(
  //         map((data) => {
  //           console.log('add user call')
  //           const user = { ...action.user, id: data._id };
  //           return addUserSuccess({ user });
  //         })
  //       );
  //     })
  //   );
  // });
  deleteImage$ = createEffect(() => {
    return this.action$.pipe(
      ofType(imageAction.deleteImage),
      switchMap(action => {
        console.log(action)
        return this.imageService.deleteImage(action?.id).pipe(
          catchError(err => {
            console.log('catch error', err)
            return of(err?.message)
          }),
          map(data => {
            return imageAction.deleteImageSuccess({ id: action.id });
          })
        );
      })
    );
  });
  // bulkDeleteImages$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(imageAction.bulkDeleteImages),
  //     switchMap(action => {
  //       return this.imageService.bulkDeleteImages(action.slugs).pipe(
  //         map(data => {
  //           return imageAction.bulkDeleteImagesSuccess({ slugs: action.slugs });
  //         })
  //       );
  //     })
  //   );
  // });
}
