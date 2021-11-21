import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  code: string = `fetch('https://storerestapi.com/api/products/leather-shoes')
	.then(response => response.json())
	.then(json => console.log(json))`
  constructor() { }

  ngOnInit(): void {
  }

}
