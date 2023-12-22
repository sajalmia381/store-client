import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { HttpService } from '@shared/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { AsPrismModule } from 'as-prism';
import { AdsenseModule } from 'ng2-adsense';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, AsPrismModule, AdsenseModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  apiBaseUrl: string = environment.apiBaseUrl;
  adminRoutePrefix = '/admin';
  productEndpoint: string = '/products/running-sneaker';
  readonly code = `
fetch('${environment.apiBaseUrl + this.productEndpoint}')
	.then(response => response.json())
	.then(json => console.log(json))`;
  productRes: any;
  isProductLoading!: boolean;
  readonly heroShowcase = `
  {
    "status": 200,
    "data": {
        "_id": "61ab43350f34753bcedfa7aa",
        "title": "men casual shoes sports running sneakers",
        "price": 100,
        "category": {
            "_id": "61ab1d0e4a0fef3f27dc664d",
            "name": "bags & shoes",
            "slug": "bags-and-shoes"
        },
        "description": null,
        "createdBy": {
            "role": "ROLE_CUSTOMER",
            "_id": "612e48fb345dcc333ac6cb2e",
            "name": "Noah Ali"
        },
        "createdAt": "2021-12-04T10:30:13.299Z",
        "updatedAt": "2021-12-04T10:30:13.299Z",
        "slug": "men-casual-shoes-sports-running-sneakers"
    },
    "message": "Success! Product found"
  }
  `;

  constructor(private http: HttpService) {}

  ngOnInit(): void {}

  fetchProduct(): void {
    this.isProductLoading = true;
    this.http.get(this.productEndpoint).subscribe(
      res => {
        this.productRes = res;
        this.isProductLoading = false;
      },
      res => {
        this.isProductLoading = false;
        this.productRes = res.error;
        console.error(res);
      }
    );
  }
}
