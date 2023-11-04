import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Category } from '../category';
import { CategoryUpdateComponent } from '../category-update/category-update.component';
import { deleteCategory, loadCategories } from '../state/category.actions';
import { getCategories, isLoaded } from '../state/category.selectors';
import { CategoryState } from '../state/category.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  isLoaded$!: Observable<boolean>;
  displayedColumns: string[] = ['name', '_id', 'products', 'action'];
  dataSource: any;
  isAlive: boolean = true;
  constructor(private store: Store<CategoryState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store
      .select(getCategories)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(categories => {
        this.dataSource = categories;
      });
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadCategories());
  }
  ngOnDestroy(): void {
    this.isAlive = false;
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
