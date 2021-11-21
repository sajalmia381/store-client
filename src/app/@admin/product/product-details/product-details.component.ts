import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { loadProduct } from '../state/product.actions';
import { getProductBySlug } from '../state/product.selectors';
import { ProductState } from '../state/product.state';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$!: Observable<Product | undefined | null>;
  constructor(private store: Store<ProductState>) {}

  ngOnInit(): void {
    this.product$ = this.store.select(getProductBySlug);
    this.store.dispatch(loadProduct());
  }
}
