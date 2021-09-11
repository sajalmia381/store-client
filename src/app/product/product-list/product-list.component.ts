import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { deleteProduct, loadProducts } from '../state/product.actions';
import { getProducts, isLoaded } from '../state/product.selectors';
import { DeleteConformationComponent } from 'src/app/shared/components/delete-conformation/delete-conformation.component';
import { Product } from '../product';
import { takeWhile } from 'rxjs/operators';

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
  displayedColumns: string[] = ['title', 'price', 'image', 'createdAt', 'action'];
  dataSource: any;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(getProducts)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(products => {
        this.dataSource = products
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
}
