import { Component, OnInit, afterNextRender, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

import { getThemeMode } from './store/shared/shared.selectors';
import { getCurrentRoute } from './store/router/router.selectors';
import { DOCUMENT } from '@angular/common';
import { setThemeMode } from '@shared/store/shared.actions';
import JwtService from '@shared/helper/JwtService';
import { loginSuccess } from './v0/auth/state/auth.actions';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private store = inject(Store);
  private document = inject(DOCUMENT);
  public loader = inject(LoadingBarService);

  progress = 0;
  constructor(private title: Title, private meta: Meta) {
    // Set inititlizer value from localStorage
    afterNextRender(() => {
      // retrive token from localstorage
      const access_token = localStorage.getItem('access_token');
      const refresh_token = localStorage.getItem('refresh_token');
      if (refresh_token) {
        const [valid, payload] = JwtService.describeToken(refresh_token);
        if (!valid) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        } else {
          this.store.dispatch(loginSuccess({ userData: { access_token, refresh_token, userInfo: payload }, redirect: false }));
        }
      }
      // Set theme value from localStorage
      const themeMode = localStorage.getItem('theme-mode');
      if (themeMode !== null) {
        this.store.dispatch(setThemeMode({ theme: themeMode }));
      }
    });

    this.store.select(getThemeMode).subscribe(theme => {
      const body = this.document.body;
      if (theme === 'dark') {
        if (body.classList.contains('light')) {
          body.classList.remove('light');
        }
        body.classList.add('dark');
      } else {
        if (body.classList.contains('dark')) {
          body.classList.remove('dark');
        }
        body.classList.add('light');
      }
    });

    this.store
      .select(getCurrentRoute)
      .pipe(
        filter(route => !!route),
        map(({ url, data }) => {
          if (url) {
            this.meta.updateTag({ name: 'og:url', content: 'https://storerestapi.com' + url });
          }
          return data || {};
        })
      )
      .subscribe(({ title, description, keywords }) => {
        if (title) {
          this.title.setTitle(`${title} | StoreRestApi`);
          this.meta.updateTag({ name: 'og:title', content: `${title} | StoreRestApi` });
        }
        if (description) {
          this.meta.updateTag({ name: 'description', content: description });
          this.meta.updateTag({ name: 'og:description', content: description });
        }
        if (keywords) {
          this.meta.updateTag({ name: 'keywords', content: keywords });
          this.meta.updateTag({ name: 'og:keywords', content: keywords });
        }
      });
    // this.router.events
    //   .pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(() => this.route),
    //     map(route => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     }),
    //     filter(route => route.outlet === 'primary'),
    //     mergeMap(route => route.data)
    //   )
    //   .subscribe(({ title, description, keywords }) => {
    //     console.log(title);
    //     console.log(description);
    //     console.log(keywords);
    //   });
  }

  ngOnInit(): void {
    this.loader.value$.subscribe(val => {
      this.progress = val;
    });
  }
}
