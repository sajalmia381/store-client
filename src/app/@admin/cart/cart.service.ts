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
    return this.http.post('/carts', payload);
  }

  updateCart(cartId: string, payload: Pick<CartFormPayload, 'products'>): Observable<Cart> {
    console.log('payload', payload)
    return this.http.post('/carts/' + cartId, payload);
  }

  deleteCart(cartId: string): Observable<Cart> {
    return this.http.delete('/carts/' + cartId);
  }
  
  // User Cart
  addUserCart(payload: CartFormPayload): Observable<Cart> {
    console.log('payload', payload)
    return this.http.post('/cart/add', payload);
  }

  updateProductQuantity(payload: CartFormPayload): Observable<Cart> {
    return this.http.put('/cart/update', payload);
  }

  removeProduct(userId: string, productId: string): Observable<Cart> {
    return this.http.delete('/cart/remove', {userId, productId});
  }
}
