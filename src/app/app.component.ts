import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

import { getThemeMode } from './store/shared/shared.selectors';
import { getCurrentRoute } from './store/router/router.selectors';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-<USERNAME>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  document = inject(DOCUMENT);
  constructor(private store: Store, private title: Title, private meta: Meta) {
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
}
