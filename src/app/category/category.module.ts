import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { StoreModule } from '@ngrx/store';
import { CATEGORY_STATE_NAME } from './state/category.selectors';
import { categoryReducer } from './state/category.reducer';
import { CategoryEffects } from './state/category.effects';
import { EffectsModule } from '@ngrx/effects';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryFormComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    StoreModule.forFeature(CATEGORY_STATE_NAME, categoryReducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  providers: [CategoryService]
})
export class CategoryModule { }
