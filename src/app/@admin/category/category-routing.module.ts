import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      title: 'Category List | Dashboard',
      description: 'category dashboard list',
      keywords: `category data`
    }
  },
  {
    path: 'add-new',
    component: CategoryFormComponent,
    data: {
      title: 'Category Form | Dashboard',
      description: 'category dashboard list',
      keywords: `category form`
    }
  },
  {
    path: ':slug',
    component: CategoryDetailsComponent,
    data: {
      title: 'Category Description | Dashboard',
      description: 'Category description',
      keywords: `category description`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {}
