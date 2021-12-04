import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { environment } from '@env/environment';
import { takeWhile } from 'rxjs/operators';
import DocData from './docDate';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isAlive: boolean = true;
  apiBaseUrl: string = environment.apiBaseUrl;
  docData: any = DocData;
  isSmallDevice!: boolean;
  isSidenavExpand: boolean = true;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(({ matches }) => {
        this.isSmallDevice = matches;
        if (matches) {
          this.isSidenavExpand = false;
        } else {
          this.isSidenavExpand = true;
        }
      });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
