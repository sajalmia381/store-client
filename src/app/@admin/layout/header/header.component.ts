import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserData } from 'src/app/v0/auth/state/auth.selectors';
import { AuthState } from 'src/app/v0/auth/state/auth.state';
import { logoutSuccess } from 'src/app/v0/auth/state/auth.actions';
import { setThemeMode } from 'src/app/store/shared/shared.actions';
import { getThemeMode } from 'src/app/store/shared/shared.selectors';
import { SharedState } from 'src/app/store/shared/shared.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef);
  private store: Store<AuthState | SharedState> = inject(Store);

  @Input({ required: true }) public isSmallDevice!: boolean;
  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();

  userData!: any;
  themeMode!: string;

  ngOnInit(): void {
    this.store
      .select(getUserData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.userData = data?.userInfo;
      });
    this.store
      .select(getThemeMode)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(theme => {
        this.themeMode = theme;
      });
  }

  ngOnDestroy(): void {}
  toggleTheme(): void {
    this.store.dispatch(setThemeMode({ theme: this.themeMode === 'dark' ? 'light' : 'dark' }));
  }
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
  onLogout(): void {
    this.store.dispatch(logoutSuccess());
  }
}
