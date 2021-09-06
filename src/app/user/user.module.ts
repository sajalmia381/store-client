import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { USER_STATE_NAME } from './state/user.selectors';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature(USER_STATE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UserModule { }
