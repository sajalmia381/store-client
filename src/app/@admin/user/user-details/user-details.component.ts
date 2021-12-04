import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUser } from '../state/user.actions';
import { getUserById } from '../state/user.selectors';
import { UserState } from '../state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user$!: Observable<User | undefined | null>;
  constructor(private store: Store<UserState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadUser());
    this.user$ = this.store.select(getUserById);
  }
}
