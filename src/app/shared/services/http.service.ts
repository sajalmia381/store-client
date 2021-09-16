import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  public getBaseUrl(): string {
    return this.apiBaseUrl;
  }

  get(url: any, queryParams?: any, responseType?: any): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    const responseTypes = responseType ? responseType : null;

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: queryParameters,
      responseType: responseTypes
    };
    return this.http.get(this.apiBaseUrl + url, httpOptions);
  }

  post(url: any, data: any, additionalHeaders?: any[]): Observable<any> {
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment',
    })
    // if (additionalHeaders) {
    //   console.log('additionalHeaders', additionalHeaders)
    //   additionalHeaders.map(item => {
    //     if (item?.key && item?.value) {
    //       console.log('exist', item.key, item.value)
    //       _headers.append(item.key, item.value)
    //     }
    //   })
    // }
    // console.log('_header', _headers)
    let httpOptions = {
      headers: _headers
    };
    const body = JSON.stringify(data);
    return this.http.post(this.apiBaseUrl + url, body, httpOptions);
  }

  upload(url: any, data: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    return this.http.post(this.apiBaseUrl + url, data, httpOptions);
  }

  put(url: any, data: any, queryParams?: any): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: queryParameters
    };
    const body = JSON.stringify(data);
    return this.http.put(this.apiBaseUrl + url, body, httpOptions);
  }

  delete(url: any, queryParams?: any): Observable<any> {
    const queryParameters = queryParams ? queryParams : {};
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: queryParameters
    };

    return this.http.delete(this.apiBaseUrl + url, httpOptions);
  }
}
