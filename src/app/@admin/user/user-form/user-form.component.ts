import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filterValidObjAttribute } from '@shared/helper/utils';
import { MustMatch } from '@shared/validations/validator';
import { addUser } from '../state/user.actions';
import { UserState } from '../state/user.state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  constructor(private store: Store<UserState>, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        number: new FormControl(null, Validators.minLength(10)),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        password_repeat: new FormControl('', [Validators.required])
      },
      {
        validators: MustMatch('password', 'password_repeat')
      }
    );
  }
  get name(): any {
    return this.userForm.get('name');
  }
  get email(): any {
    return this.userForm.get('email');
  }
  get number(): any {
    return this.userForm.get('number');
  }
  get password(): any {
    return this.userForm.get('password');
  }
  get passwordRepeat(): any {
    return this.userForm.get('password_repeat');
  }
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.snackBar.open('User form is not valid', 'Close', {
        duration: 2000
      });
      return;
    }
    const user = filterValidObjAttribute(this.userForm.value);
    this.store.dispatch(addUser({ user }));
  }
}
