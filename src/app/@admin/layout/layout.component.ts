import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isSidenavExpand = true;
  isLessThenLargeDevice = true;
  
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe(({matches}) => {
      this.isLessThenLargeDevice = matches;
      if (matches) {
        this.isSidenavExpand = false;
      } else {
        this.isSidenavExpand = true;
      }
      this.router.events.pipe(
        takeWhile(() => this.isLessThenLargeDevice),
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.isSidenavExpand = false;
      })
    });
  }

  ngOnInit(): void {}

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
