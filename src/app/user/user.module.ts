import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './state/user.reducer';
import { USER_STATE_NAME } from './state/user.selectors';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_STATE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatTableModule,
  ]
})
export class UserModule { }
