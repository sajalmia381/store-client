import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filterValidObjAttribute } from '@shared/helper/utils';
import { takeWhile } from 'rxjs/operators';
import { updateUser } from '../state/user.actions';
import { getUserById } from '../state/user.selectors';
import { UserState } from '../state/user.state';
import { User } from '../user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit, OnDestroy {
  isAlive = true;
  userForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl(null, Validators.required),
    number: new UntypedFormControl(null, Validators.required)
  });
  user!: User;
  constructor(
    private store: Store<UserState>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store
      .select(getUserById)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        if (data) {
          this.user = data;
          this.userForm.patchValue({
            name: data?.name,
            number: data?.number
          });
        }
      });
  }
  get name(): any {
    return this.userForm.get('name');
  }
  get email(): any {
    return this.userForm.get('email');
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  onFormSubmit(): void {
    if (this.userForm.invalid) {
      this.snackbar.open('Form is not valid', 'close');
      return;
    }
    const user = filterValidObjAttribute(this.userForm.value);
    this.store.dispatch(updateUser({userId: this.user._id,  user}));
  }
}
