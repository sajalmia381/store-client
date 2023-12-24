import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { deleteUser, loadUsers } from '../state/user.actions';
import { getUsers, isLoaded } from '../state/user.selectors';
import { UserState } from '../state/user.state';
import { User } from '../user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  user$!: Observable<User[]>;
  isLoaded$!: Observable<boolean>;
  loading: boolean = false;

  // Table
  displayedColumns: string[] = ['email', 'name', 'role', 'number', 'createdAt', 'updatedAt', 'action'];
  dataSource!: User[];

  constructor(private store: Store<UserState>, private dialog: MatDialog) {
    this.user$ = this.store.select(getUsers).pipe(takeUntilDestroyed());
    this.isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  }

  ngOnInit(): void {
    this.user$.subscribe(data => {
      this.dataSource = data;
    });
    this.store.dispatch(loadUsers());
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
