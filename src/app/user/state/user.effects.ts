import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';
import * as userAction from './user.actions';
import { addUserSuccess } from './user.actions';
import { getUsers, isLoaded } from './user.selectors';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private userService: UserService
  ) {}
  loadUsers$ = createEffect(() => {
    return this.action$.pipe(
      ofType(userAction.loadUsers),
      withLatestFrom(this.store.select(isLoaded)),
      mergeMap(([action, loaded]) => {
        return this.userService.getUsers().pipe(
          map(users => {
            console.log(users)
            return userAction.loadUsersSuccess({ users });
          })
        );
      })
    );
  });
  loadSingleUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        console.log('router event', r);
        return r.payload.routerState.url.startsWith('/users/');
      }),
      map((r: any) => { // RouterNavigatedAction
        console.log('router event inner', r);
        return r.payload.routerState?.params?.id
      }),
      withLatestFrom(this.store.select(getUsers)),
      switchMap(([id, users]) => {
        if (!users.length) {
          return this.userService.getUser(id).pipe(
            map((res: any) => {
              console.log(res)
              const postData = [{ ...res?.data, id }];
              return userAction.loadUsersSuccess({ users: postData });
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
      switchMap((action) => {
        return this.userService.addUser(action.user).pipe(
          map((data) => {
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
        return this.userService.updateUser(action.user).pipe(
          map(user => {
            console.log('effect update user', user)
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
        console.log(action)
        return this.userService.deleteUser(action?.id).pipe(
          catchError(err => {
            console.log('catch error', err)
            return of(err?.message)
          }),
          map(data => {
            return userAction.deleteUserSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
