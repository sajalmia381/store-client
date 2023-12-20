import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { takeWhile } from 'rxjs/operators';
import { productDoc, categoryDoc, cartDoc, userDoc, authDoc, todoDoc } from './data';

import { IApi } from '@shared/components/api';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})
export class DocComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isAlive: boolean = true;
  apiBaseUrl: string = environment.apiBaseUrl;
  isSmallDevice!: boolean;
  isSidenavExpand: boolean = true;

  productDoc = productDoc;
  categoryDoc = categoryDoc;
  cartDoc = cartDoc;
  userDoc = userDoc;
  authDoc = authDoc;
  todoDoc = todoDoc;

  constructor(private breakpointObserver: BreakpointObserver, private title: Title) {
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

  ngOnInit(): void {
    this.title.setTitle('Documentation | StoreRestApi');
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavExpand = this.sidenav.opened;
  }
}
