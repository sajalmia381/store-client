import { Injectable, inject } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartFormPayload, RequestUserCartPayload } from './cart';

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
    return this.http.post('/carts', payload);
  }
  updateCart(cartId: string, payload: Pick<CartFormPayload, 'products'>): Observable<Cart> {
    return this.http.put('/carts/' + cartId, payload);
  }
  deleteCart(cartId: string): Observable<Cart> {
    return this.http.delete('/carts/' + cartId);
  }

  // Request User Cart
  getRequestUserCart(): Observable<Cart> {
    return this.http.get('/cart',);
  }
  addRequestUserCart(payload: CartFormPayload): Observable<Cart> {
    console.log('payload', payload);
    return this.http.post('/cart/add', payload);
  }
  updateRequestUserCart(payload: RequestUserCartPayload): Observable<Cart> {
    return this.http.put('/cart/update', payload);
  }
  removeProductRequestUserCart(userId: string, productId: string): Observable<Cart> {
    return this.http.delete('/cart/remove', { userId, productId });
  }
}
