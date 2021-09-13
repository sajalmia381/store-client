import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as categoryAction from './category.actions';
import { getCategorySlugs, isLoaded } from './category.selectors';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { CategoryService } from '../category.service';
@Injectable()
export class CategoryEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private categoryService: CategoryService
  ) {}
  loadCategories$ = createEffect(() => {
    return this.action$.pipe(
      ofType(categoryAction.loadCategories),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.categoryService.getCategories().pipe(
          map(categories => {
            return categoryAction.loadCategoriesSuccess({ categories });
          })
        );
      })
    );
  });
  // loadSingleProduct$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(categoryAction.loadProduct),
  //     withLatestFrom(this.store.select(getCurrentRoute), this.store.select(getProductSlugs)),
  //     switchMap(([action, route, slugs]) => {
  //       const slug = route.params.slug;
  //       const isSlugExists = slugs.some(_slug => _slug === slug)
  //       if (!isSlugExists) {
  //         return this.productService.getProduct(slug).pipe(
  //           map((res: any) => {
  //             const product = { ...res?.data, slug };
  //             return categoryAction.addOneProduct({ product });
  //           })
  //         );
  //       }
  //       return of(categoryAction.dummyAction());
  //     })
  //   );
  // });
  // updateProduct$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(categoryAction.updateProduct),
  //     switchMap(action => {
  //       return this.productService.updateProduct(action.product).pipe(
  //         map(product => {
  //           const updatedProduct: Update<Product> = {
  //             id: action.product._id,
  //             changes: {
  //               ...action.product
  //             }
  //           };
  //           return categoryAction.updateProductSuccess({ product: updatedProduct });
  //         })
  //       );
  //     })
  //   )
  // );
  // deleteProduct$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(categoryAction.deleteProduct),
  //     switchMap(action => {
  //       console.log(action)
  //       return this.productService.deleteProduct(action?.id).pipe(
  //         catchError(err => {
  //           console.log('catch error', err)
  //           return of(err?.message)
  //         }),
  //         map(data => {
  //           return categoryAction.deleteProductSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });
}
