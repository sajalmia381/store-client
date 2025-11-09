import { BreakpointObserver } from '@angular/cdk/layout';

import { Component, ViewChild, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-doc',
    templateUrl: './doc.component.html',
    styleUrls: ['./doc.component.scss'],
    standalone: false
})
export class DocComponent {
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallDevice!: boolean;
  isSidenavExpand: boolean = true;

  fragment$ = this.route.fragment.pipe(
    takeUntilDestroyed(),
    // distinctUntilChanged(),
    filter(val => !!val)
  );

  isResourceFeatureRoute: boolean = false;

  constructor() {
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .pipe(takeUntilDestroyed())
      .subscribe(({ matches }) => {
        this.isSmallDevice = matches;
        if (matches) {
          this.isSidenavExpand = false;
        } else {
          this.isSidenavExpand = true;
        }
      });

    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(event => {
          // For reload or first browse this docs page
          if (event instanceof Scroll) {
            return event.routerEvent.id === 1;
          }
          return event instanceof NavigationEnd;
        }),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          this.isResourceFeatureRoute = !!route.snapshot.url.length;
          return route.snapshot.fragment;
        }),
        delay(100)
      )
      .subscribe(fragment => {
        const sidenavContent = <HTMLElement>this.document.querySelector('.doc-layout-content');
        if (fragment && sidenavContent) {
          const target = this.document.getElementById(fragment);
          if (target) {
            (<HTMLElement>this.document.querySelector('.doc-layout-content')).scrollTop =
              target.offsetTop + (<HTMLElement>target?.offsetParent).offsetTop - 20;
          }
        } else {
          (<HTMLElement>this.document.querySelector('.doc-layout-content')).scrollTop = 0;
        }
      });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
