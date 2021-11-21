import { Component, OnInit } from '@angular/core';
import DocData from './docDate';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit {
  docData: any = DocData;
  constructor() { }

  ngOnInit(): void {
  }

}
