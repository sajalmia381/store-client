import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../shared/services/http.service';
import { Product } from './product';

@Injectable({
  providedIn: '<USERNAME>'
})
export class ProductService {
  constructor(private http: HttpService) {}

  getProducts(): Observable<Product[]> {
    return this.http.get('/products').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post('/products', product);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get('/products/' + id);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put('/products/' + product?._id, product);
  }
  deleteProduct(id: string): Observable<Product> {
    return this.http.delete('/products/' + id).pipe(map(res => {
      return res
    }))
  }
}
