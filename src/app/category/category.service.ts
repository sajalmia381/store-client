import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './category';

@Injectable()
export class CategoryService {

  constructor(private http: HttpService) { }
  
  getCategories(): Observable<Category[]> {
    return this.http.get('/categories')
      .pipe(map(res => {
        return res?.data
      }))
  }
}
