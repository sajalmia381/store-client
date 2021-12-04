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
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryFormComponent,
    CategoryDetailsComponent,
    CategoryUpdateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    MatTableModule,
    MatMenuModule
    // StoreModule.forFeature(CATEGORY_STATE_NAME, categoryReducer),
    // EffectsModule.forFeature([CategoryEffects]),
  ],
  providers: [CategoryService],
  entryComponents: [CategoryFormComponent, CategoryUpdateComponent]
})
export class CategoryModule {}
