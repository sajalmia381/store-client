import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { deleteProduct, loadProducts } from '../state/product.actions';
import { getProducts, isLoaded } from '../state/product.selectors';
import { DeleteConformationComponent } from 'src/app/shared/components/delete-conformation/delete-conformation.component';
import { Product } from '../product';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';
import { MatSidenav } from '@angular/material/sidenav';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { filterValidObjAttribute } from '@shared/helper/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @ViewChild('filterSidenav') filterSidenav!: MatSidenav;
  currentView = 'list';
  isLoaded$!: Observable<boolean>;
  products$!: Observable<Product[]>;
  displayedColumns: string[] = ['select', 'title', 'price', 'category', 'createdBy', 'createdAt', 'action'];
  selection = new SelectionModel<Product>(true, []);
  dataSource: any = new MatTableDataSource<Product>([]);
  backendBaseUrl: string = environment.baseUrl;
  filterForm!: UntypedFormGroup;

  constructor(private store: Store, private dialog: MatDialog) {
    this.isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
    this.products$ = this.store.select(getProducts).pipe(takeUntilDestroyed());
  }

  ngOnInit(): void {
    this.filterForm = new UntypedFormGroup({
      q: new UntypedFormControl(['']),
      sort: new UntypedFormControl([''])
    });
    this.products$.subscribe(products => {
      this.dataSource.data = products;
    });
    this.store.dispatch(loadProducts({}));
  }

  toggleView(): void {
    this.currentView = this.currentView === 'grid' ? 'list' : 'grid';
  }

  onDelete(product: Product): void {
    const deleteDialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: 'Are you sure! you want to delete ' + product?.title + '?'
      }
    });
    deleteDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteProduct({ id: product?.slug }));
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id + 1}`;
  }

  onBulkDelete(): void {
    const dialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: 'Are you sure! you want to bulk delete "' + this.selection.selected.map(item => item.slug) + '"?'
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // this.store.dispatch(deleteProduct({ id: product?.slug }));
        console.log(this.selection);
      }
    });
  }
  // Filter
  toggleSidenav(): void {
    this.filterSidenav.toggle();
  }
  onFilter(): void {
    console.log();
    if (this.filterForm.dirty) {
      this.store.dispatch(loadProducts({ queryParams: filterValidObjAttribute(this.filterForm.value) }));
    }
  }
}
