import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { loadProduct } from '../state/product.actions';
import { getProductBySlug } from '../state/product.selectors';
import { ProductState } from '../state/product.state';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss'],
    standalone: false
})
export class ProductDetailsComponent implements OnInit {
  private store = inject<Store<ProductState>>(Store);

  product$!: Observable<Product | undefined | null>;

  ngOnInit(): void {
    this.product$ = this.store.select(getProductBySlug);
    this.store.dispatch(loadProduct());
  }
}
