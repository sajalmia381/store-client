import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { MatTooltipModule } from '@angular/material/tooltip';
import { userReducer } from './state/user.reducer';
import { USER_STATE_NAME } from './state/user.selectors';
import { SharedModule } from '@shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserFormComponent } from './user-form/user-form.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_STATE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatTableModule,
    MatTooltipModule,
  ],
})
export class UserModule { }
