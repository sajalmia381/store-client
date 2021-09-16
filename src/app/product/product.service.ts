import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../shared/services/http.service';
import { Product } from './product';

@Injectable()
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
    let img: any;
    if (product.hasOwnProperty('image')) {
      img = product['image']
    }
    console.log('img', img)
    
    return this.http.post('/products', product, [
      { 
        key: 'Content-Disposition',
        value: 'attachment ' + img,
      }
    ]);
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
