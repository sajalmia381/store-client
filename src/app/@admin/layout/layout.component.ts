import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isAlive: boolean = true;
  isSidenavExpand = true;
  isLessThenLargeDevice = true;

  constructor() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(({ matches }) => {
        this.isLessThenLargeDevice = matches;
        if (matches) {
          this.isSidenavExpand = false;
        } else {
          this.isSidenavExpand = true;
        }
        this.router.events
          .pipe(
            takeWhile(() => this.isLessThenLargeDevice),
            filter(event => event instanceof NavigationEnd)
          )
          .subscribe(() => {
            this.isSidenavExpand = false;
          });
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
