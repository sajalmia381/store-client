import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getThemeMode } from './store/shared/shared.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.select(getThemeMode).subscribe(theme => {
      const body = document.body;
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
  }
  title = 'store-admin';
}
