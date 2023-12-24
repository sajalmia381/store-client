import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSmallDevice!: boolean;
  isSidenavExpand: boolean = true;

  fragment$ = this.route.fragment.pipe(
    takeUntilDestroyed(),
    // distinctUntilChanged(),
    filter(val => !!val)
  );

  constructor(private breakpointObserver: BreakpointObserver, private route: ActivatedRoute) {
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
  }

  ngAfterViewInit(): void {
    this.fragment$.subscribe(value => {
      const target = document.getElementById(value || '');
      const sidenavContent = <HTMLElement>document.querySelector('.doc-layout-content');
      if (target && sidenavContent) {
        console.dir(target);
        console.log('offsetTop', target.offsetTop);
        (<HTMLElement>document.querySelector('.doc-layout-content')).scrollTop =
          target.offsetTop + (<HTMLElement>target.parentNode).offsetTop;
      } else {
        (<HTMLElement>document.querySelector('.doc-layout-content')).scrollTop = 0;
      }
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
