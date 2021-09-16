import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { Product } from '../product';
import * as productAction from './product.actions';
import { getProductSlugs, isLoaded } from './product.selectors';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
@Injectable()
export class ProductEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private productService: ProductService
  ) {}
  loadProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.loadProducts),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.productService.getProducts().pipe(
          map(products => {
            return productAction.loadProductsSuccess({ products });
          })
        );
      })
    );
  });
  loadSingleProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.loadProduct),
      withLatestFrom(this.store.select(getCurrentRoute), this.store.select(getProductSlugs)),
      switchMap(([action, route, slugs]) => {
        const slug = route.params.slug;
        const isSlugExists = slugs.some(_slug => _slug === slug)
        if (!isSlugExists) {
          return this.productService.getProduct(slug).pipe(
            map((res: any) => {
              const product = { ...res?.data, slug };
              return productAction.addProductSuccess({ product });
            })
          );
        }
        return of(productAction.dummyAction());
      })
    );
  });
  addProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.addProduct),
      switchMap((action) => {
        return this.productService.addProduct(action.product).pipe(
          map((res: any) => {
            console.log('add product call', res)
            
            const product = { ...res.data, id: res.data?.slug };
            return productAction.addProductSuccess({ product });
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
  updateProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.updateProduct),
      switchMap(action => {
        return this.productService.updateProduct(action.product).pipe(
          map(product => {
            const updatedProduct: Update<Product> = {
              id: action.product._id,
              changes: {
                ...action.product
              }
            };
            return productAction.updateProductSuccess({ product: updatedProduct });
          })
        );
      })
    )
  );
  deleteProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(productAction.deleteProduct),
      switchMap(action => {
        console.log(action)
        return this.productService.deleteProduct(action?.id).pipe(
          catchError(err => {
            console.log('catch error', err)
            return of(err?.message)
          }),
          map(data => {
            return productAction.deleteProductSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
