import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as categoryAction from './category.actions';
import { getCategorySlugs, isLoaded } from './category.selectors';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';

@Injectable()
export class CategoryEffects {
  constructor(private store: Store, private action$: Actions, private categoryService: CategoryService) {}
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
  loadCategory$ = createEffect(() => {
    return this.action$.pipe(
      ofType(categoryAction.loadCategory),
      withLatestFrom(this.store.select(getCurrentRoute), this.store.select(getCategorySlugs)),
      switchMap(([action, route, slugs]) => {
        const slug = route.params.slug;
        const isSlugExists = slugs.some(_slug => _slug === slug);
        return this.categoryService.getCategory(slug).pipe(
          map((res: any) => {
            const category = res?.data;
            if (!isSlugExists) {
              return categoryAction.addOneCategorySuccess({ category });
            }
            console.log(category);
            return categoryAction.updateCategorySuccess({ category });
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
        return this.categoryService.updateCategory(action.slug, action.payload).pipe(
          map(category => {
            const updatedCategory: Update<Category> = {
              id: action._id,
              changes: {
                ...action.payload
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
