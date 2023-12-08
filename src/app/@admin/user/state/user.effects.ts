import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { getCurrentRoute } from 'src/app/store/router/router.selectors';
import { User } from '../user';
import { UserService } from '../user.service';
import * as userAction from './user.actions';
import { addUserSuccess } from './user.actions';
import { getUsersId, isLoaded } from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(private store: Store, private action$: Actions, private userService: UserService) {}
  loadUsers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.loadUsers),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.userService.getUsers().pipe(
          map(users => {
            console.log(users);
            return userAction.loadUsersSuccess({ users });
          })
        );
      })
    );
  });
  loadSingleUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.loadUser),
      withLatestFrom(this.store.select(getCurrentRoute), this.store.select(getUsersId)),
      switchMap(([action, route, ids]) => {
        console.log(action, route, ids);
        console.log('route', route?.params?.id);
        const id = route?.params?.id || '';
        const isIdExists = ids.some(_id => _id === id);
        if (!isIdExists) {
          return this.userService.getUser(id).pipe(
            map((res: any) => {
              console.log(res);
              const user = { ...res?.data, id: id };
              return userAction.addUserSuccess({ user });
            })
          );
        }
        return of(userAction.dummyAction());
      })
    );
  });
  addUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.addUser),
      switchMap(action => {
        return this.userService.addUser(action.user).pipe(
          map(data => {
            console.log('add user call');
            const user = { ...action.user, id: data._id };
            return addUserSuccess({ user });
          })
        );
      })
    );
  });
  updateUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(userAction.updateUser),
      switchMap(action => {
        return this.userService.updateUser(action.userId, action.user).pipe(
          map(user => {
            console.log('effect update user', user);
            const updatedUser: Update<User> = {
              id: action.user._id,
              changes: {
                ...action.user
              }
            };
            return userAction.updateUserSuccess({ user: updatedUser });
          })
        );
      })
    )
  );
  deleteUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.deleteUser),
      switchMap(action => {
        console.log(action);
        return this.userService.deleteUser(action?.id).pipe(
          catchError(err => {
            console.log('catch error', err);
            return of(err?.message);
          }),
          map(data => {
            return userAction.deleteUserSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
