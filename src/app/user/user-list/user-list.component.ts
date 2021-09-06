import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers } from '../state/user.actions';
import { getUsers, isLoaded } from '../state/user.selectors';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$!: Observable<User[]>;
  isLoaded$!: Observable<boolean>;
  loading: boolean = false;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.store.select(getUsers);
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadUsers());
  }
}
