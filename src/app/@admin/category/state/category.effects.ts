import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as categoryAction from './category.actions';
import { isLoaded } from './category.selectors';
import { CategoryService } from '../category.service';
import { Category } from '../category';
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
  addCategory$ = createEffect(() => {
    return this.action$.pipe(
      ofType(categoryAction.addOneCategory),
      switchMap(action => {
        console.log(action);
        return this.categoryService.addCategory(action.category).pipe(
          map((res: any) => {
            console.log('add Category call', res);
            const category = { ...res.data, id: res.data?.slug };
            return categoryAction.addOneCategorySuccess({ category });
          })
        );
      })
    );
  });
  updateCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(categoryAction.updateCategory),
      switchMap(action => {
        return this.categoryService.updateCategory(action.category).pipe(
          map(category => {
            const updatedCategory: Update<Category> = {
              id: action.category._id,
              changes: {
                ...action.category
              }
            };
            return categoryAction.updateCategorySuccess({ category: updatedCategory });
          })
        );
      })
    )
  );
  deleteCategory$ = createEffect(() => {
    return this.action$.pipe(
      ofType(categoryAction.deleteCategory),
      switchMap(action => {
        console.log(action);
        return this.categoryService.deleteCategory(action?.id).pipe(
          catchError(err => {
            console.log('catch error', err);
            return of(err?.message);
          }),
          map(data => {
            return categoryAction.deleteCategorySuccess({ id: action.id });
          })
        );
      })
    );
  });
}
