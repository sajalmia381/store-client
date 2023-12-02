import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { deleteCategory, loadCategories } from '../state/category.actions';
import { getCategories, isLoaded } from '../state/category.selectors';
import { CategoryState } from '../state/category.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoaded$!: Observable<boolean>;
  categories$!: Observable<Category[]>;
  displayedColumns: string[] = ['name', 'products', 'action'];
  dataSource: any;
  constructor(private store: Store<CategoryState>, private dialog: MatDialog) {
    this.isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
    this.categories$ = this.store.select(getCategories).pipe(takeUntilDestroyed());
  }

  ngOnInit(): void {
    this.categories$.subscribe(categories => {
      this.dataSource = categories;
    });
    this.store.dispatch(loadCategories());
  }

  onDelete(category: Category): void {
    const deleteDialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: 'Are you sure! you want to delete ' + category?.name + '?'
      }
    });
    deleteDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteCategory({ id: category?.slug }));
      }
    });
  }
  onUpdate(category: Category): void {
    const deleteDialogRef = this.dialog.open(CategoryUpdateComponent, {
      width: '100%',
      maxWidth: '400px',
      data: category
    });
    deleteDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      // trigger when dialog close
    });
  }
}
