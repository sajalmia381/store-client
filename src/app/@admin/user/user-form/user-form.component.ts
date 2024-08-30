import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  private store = inject<Store<UserState>>(Store);
  private snackBar = inject(MatSnackBar);

  userForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.userForm = new UntypedFormGroup(
      {
        name: new UntypedFormControl('', [Validators.required]),
        email: new UntypedFormControl('', [Validators.required, Validators.email]),
        number: new UntypedFormControl(null, Validators.minLength(10)),
        password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
        password_repeat: new UntypedFormControl('', [Validators.required])
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
