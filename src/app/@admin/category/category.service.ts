import { Injectable, inject } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpService);


  getCategories(): Observable<Category[]> {
    return this.http.get('/categories').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addCategory(category: Category): Observable<Category> {
    return this.http.post('/categories', category);
  }
  getCategory(slug: string): Observable<Category> {
    return this.http.get('/categories/' + slug);
  }
  updateCategory(slug: string, payload: Partial<Category>): Observable<Category> {
    return this.http.put('/categories/' + slug, payload);
  }
  deleteCategory(slug: string): Observable<Category> {
    return this.http.delete('/categories/' + slug).pipe(
      map(res => {
        return res;
      })
    );
  }
}
