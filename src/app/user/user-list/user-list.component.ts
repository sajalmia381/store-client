import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { loadUsers } from '../state/user.actions';
import { getUsers, isLoaded } from '../state/user.selectors';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;
  users$!: Observable<User[]>;
  isLoaded$!: Observable<boolean>;
  loading: boolean = false;
  
  // Table
  displayedColumns: string[] = ['_id', 'email', 'name', 'role', 'number', 'createdAt', 'updatedAt', 'action'];
  dataSource: any;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(getUsers)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.dataSource = data;
      });
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadUsers());
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
}
