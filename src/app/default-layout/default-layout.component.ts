import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isAlive: boolean = true;
  isSmallDevice!: boolean;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 767px)'])
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(({matches}) => {
        this.isSmallDevice = matches;
      });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
