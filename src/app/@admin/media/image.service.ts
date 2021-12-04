import { Injectable } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from './Image';

@Injectable({
  providedIn: '<USERNAME>'
})
export class ImageService {
  constructor(private http: HttpService) {}

  getImages(): Observable<Image[]> {
    return this.http.get('/images').pipe(
      map(res => {
        return res?.data;
      })
    );
  }
  addImage(image: Image): Observable<Image> {
    return this.http.upload('/images', image);
  }
  getImage(id: string): Observable<Image> {
    return this.http.get('/images/' + id);
  }

  deleteImage(id: string): Observable<any> {
    return this.http.delete('/images/' + id).pipe(
      map(res => {
        return res;
      })
    );
  }

  bulkDeleteImages(slugs: string[]): Observable<any> {
    return this.http.delete('/images/bulk' + slugs).pipe(
      map(res => {
        return res;
      })
    );
  }
}
