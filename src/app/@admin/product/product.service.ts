import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../shared/services/http.service';
import { Product } from './product';

@Injectable()
export class ProductService {
  private http = inject(HttpService);


  getProducts(queryParams?: any): Observable<Product[]> {
    return this.http.get('/products', queryParams && queryParams).pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addProduct(product: Product): Observable<Product> {
    let img: any;
    if (product.hasOwnProperty('image')) {
      img = product['image'];
    }
    console.log('img', img);

    return this.http.post('/products', product);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get('/products/' + id);
  }
  updateProduct(product: Product): Observable<Product> {
    const { slug, ...payload } = product;
    return this.http.put('/products/' + slug, payload).pipe(map(res => res?.data));
  }
  deleteProduct(id: string): Observable<any> {
    return this.http.delete('/products/' + id).pipe(
      map(res => {
        return res;
      })
    );
  }

  bulkDeleteProducts(slugs: string[]): Observable<any> {
    return this.http.delete('/products/bulk' + slugs).pipe(
      map(res => {
        return res;
      })
    );
  }
}
