import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutSuccess } from 'src/app/v0/auth/state/auth.actions';
import { AuthState } from 'src/app/v0/auth/state/auth.state';
import { setThemeMode } from 'src/app/store/shared/shared.actions';
import { getThemeMode } from 'src/app/store/shared/shared.selectors';
import { SharedState } from 'src/app/store/shared/shared.state';
import { environment } from '@env/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private store = inject<Store<AuthState | SharedState>>(Store);

  @Output() toggleSidenav = new EventEmitter();
  themeMode!: string;
  isProductionMode: boolean = environment.production;

  ngOnInit(): void {
    this.store.select(getThemeMode).subscribe(theme => {
      this.themeMode = theme;
    });
  }
  toggleTheme(): void {
    const theme = this.themeMode === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme-mode', theme);
    this.store.dispatch(setThemeMode({ theme }));
  }
  onLogout(): void {
    this.store.dispatch(logoutSuccess());
  }
}
