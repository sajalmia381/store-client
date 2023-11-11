import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { deleteUser, loadUsers } from '../state/user.actions';
import { getUsers, isLoaded } from '../state/user.selectors';
import { UserState } from '../state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;

  isLoaded$!: Observable<boolean>;
  loading: boolean = false;

  // Table
  displayedColumns: string[] = [
    '_id',
    'email',
    'name',
    'role',
    'number',
    'createdAt',
    'updatedAt',
    'action'
  ];
  dataSource!: User[];
  constructor(private store: Store<UserState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store
      .select(getUsers)
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
  onDelete(user: User): void {
    const dialogRef = this.dialog.open(DeleteConformationComponent, {
      data: {
        message: `Are you sure want to delete "${user.email}"?`
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteUser({ id: user?._id }));
      }
    });
  }
}
