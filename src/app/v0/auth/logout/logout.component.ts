import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutSuccess } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
  selector: 'app-logout',
  template: ``
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(logoutSuccess());
  }
}
