import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { UserService } from '../user.service';
import * as userAction from './user.actions';
import { isLoaded } from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private userService: UserService
  ) {}
  loadProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.loadUsers),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.userService.getUsers().pipe(
          map(users => {
            return userAction.loadUsersSuccess({ users });
          })
        );
      })
    );
  });
  // loadSingleProduct$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       console.log('router event', r);
  //       return r.payload.routerState.url.startsWith('/products/');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       console.log('router event inner', r);
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getProducts)),
  //     switchMap(([id, products]) => {
  //       if (!products.length) {
  //         return this.productService.getProduct(id).pipe(
  //           map(product => {
  //             const postData = [{ ...product, id }];
  //             return productAction.loadProductsSuccess({ products: postData });
  //           })
  //         );
  //       }
  //       return of(productAction.dummyAction());
  //     })
  //   );
  // });
  // updateProduct$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(productAction.updateProduct),
  //     switchMap(action => {
  //       return this.productService.updateProduct(action.product).pipe(
  //         map(product => {
  //           const updatedProduct: Update<Product> = {
  //             id: action.product.id,
  //             changes: {
  //               ...action.product
  //             }
  //           };
  //           return productAction.updateProductSuccess({ product: updatedProduct });
  //         })
  //       );
  //     })
  //   )
  // );
  // deleteProduct$ = createEffect(() => {
  //   return this.action$.pipe(
  //     ofType(productAction.deleteProduct),
  //     switchMap(action => {
  //       console.log(action)
  //       return this.productService.deleteProduct(action?.id).pipe(
  //         catchError(err => {
  //           console.log('catch error', err)
  //           return of(err?.message)
  //         }),
  //         map(data => {
  //           return productAction.deleteProductSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });
}
