import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutSuccess } from '../state/auth.actions';
import { AuthState } from '../state/auth.state';

@Component({
    selector: 'app-logout',
    template: ``,
    standalone: false
})
export class LogoutComponent implements OnInit {
  private store = inject<Store<AuthState>>(Store);


  ngOnInit(): void {
    this.store.dispatch(logoutSuccess());
  }
}
