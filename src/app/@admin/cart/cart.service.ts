import { Injectable, inject } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartFormPayload } from './cart';

@Injectable()
export class CartService {
  private http = inject(HttpService);

  getCarts(): Observable<Cart[]> {
    return this.http.get('/carts').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  

  addCart(payload: CartFormPayload): Observable<Cart> {
    console.log('payload', payload)
    return this.http.post('/cart/add', payload);
  }
}
