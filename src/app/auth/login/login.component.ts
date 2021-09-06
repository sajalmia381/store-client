import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { setLoading } from 'src/app/store/shared/shared.actions';
import { getLoadingStatus } from 'src/app/store/shared/shared.selectors';
import { loginRequest } from '../state/auth.actions';
import { getLoginErrors, isSignedIn } from '../state/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  isLoading!: boolean;
  formErrors: any;
  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select(isSignedIn)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(bool => {
        if (bool) {
          this.router.navigate(['/']);
        }
      });
    this.store
      .select(getLoadingStatus)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(bool => {
        this.isLoading = bool;
      });

    this.store
      .select(getLoginErrors)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(errors => {
        this.formErrors = errors;
        if (errors?.username) {
          // this.usernameField.
          this.loginForm.controls['email'].setErrors({ userNotFound: true });
          this.loginForm.controls['password'].setErrors({ incorrect: true });
        }
        if (errors?.password) {
          this.loginForm.controls['password'].setErrors({ incorrect: true });
        }
      });
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.store.dispatch(setLoading({ status: false }));
  }
  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }
  onSubmit(): void {
    this.store.dispatch(setLoading({ status: true }));
    this.store.dispatch(loginRequest(this.loginForm.value));
  }
}
