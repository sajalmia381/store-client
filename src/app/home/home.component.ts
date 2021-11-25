import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { HttpService } from '@shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apiBaseUrl: string = environment.apiBaseUrl
  productEndpoint: string = '/products/running-sneaker';
  code: string = `fetch('${environment.apiBaseUrl + this.productEndpoint}')
	.then(response => response.json())
	.then(json => console.log(json))`
  productRes: any;
  isProductLoading!: boolean;
  constructor(private http: HttpService) { }

  ngOnInit(): void { }
  
  fetchProduct(): void {
    this.isProductLoading = true;
    this.http.get(this.productEndpoint).subscribe(res => {
      this.productRes = res;
      this.isProductLoading = false
    }, (res) => {
      this.isProductLoading = false;
      this.productRes = res.error;
      console.error(res)
    })
  }
}
