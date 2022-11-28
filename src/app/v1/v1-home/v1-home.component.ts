import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@env/environment';
import { V1HttpService } from '@shared/services/v1-http.service';
import { SharedModule } from '@shared/shared.module';
import { PrismModule } from 'src/app/@plugin/prism/prism.module';

import 'prismjs/components/prism-typescript';

@Component({
  selector: 'app-v1-home',
  standalone: true,
  imports: [CommonModule, SharedModule, PrismModule],
  templateUrl: './v1-home.component.html',
  styleUrls: ['./v1-home.component.scss']
})
export class V1HomeComponent implements OnInit {
  apiBaseUrl: string = environment.v1BaseUrl;
  productEndpoint: string = '/products/running-sneaker';
  code: string = `fetch('${environment.v1BaseUrl + this.productEndpoint}')
	.then(response => response.json())
	.then(json => console.log(json))`;
  productRes: any;
  isProductLoading!: boolean;
  
  constructor(private http: V1HttpService) { }

  ngOnInit(): void { }

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
