import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { deleteProduct, loadProducts } from '../state/product.actions';
import { getProducts, isLoaded } from '../state/product.selectors';
import { DeleteConformationComponent } from 'src/app/shared/components/delete-conformation/delete-conformation.component';
import { Product } from '../product';
import { takeWhile } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '@env/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  currentView = 'list';
  isAlive: boolean = true;
  isLoaded$!: Observable<boolean>;
  loading!: false;
  displayedColumns: string[] = ['select', 'title', 'price', 'image', 'createdAt', 'action'];
  selection = new SelectionModel<Product>(true, []);
  dataSource: any = new MatTableDataSource<Product>([]);
  backendBaseUrl: string = environment.baseUrl;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(getProducts)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(products => {
        this.dataSource.data = products;
      });
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadProducts());
    
  }
  ngOnDestroy(): void {
    this.isAlive = false;
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
        console.log(this.selection)
      }
    });
  }
}
