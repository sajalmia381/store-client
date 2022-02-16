import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserData } from 'src/app/auth/state/auth.selectors';
import { AuthState } from 'src/app/auth/state/auth.state';
import { logoutSuccess } from 'src/app/auth/state/auth.actions';
import { setThemeMode } from 'src/app/store/shared/shared.actions';
import { getThemeMode } from 'src/app/store/shared/shared.selectors';
import { SharedState } from 'src/app/store/shared/shared.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData!: any;
  themeMode!: string;
  constructor(private store: Store<AuthState | SharedState>) {}

  ngOnInit(): void {
    this.store.select(getUserData).subscribe(data => {
      // console.log('userData form header', data)
      this.userData = data?.userInfo;
    });
    this.store.select(getThemeMode).subscribe(theme => {
      this.themeMode = theme;
    });
  }
  toggleTheme(): void {
    this.store.dispatch(setThemeMode({ theme: this.themeMode === 'dark' ? 'light' : 'dark' }));
  }
  onLogout(): void {
    this.store.dispatch(logoutSuccess());
  }
}
