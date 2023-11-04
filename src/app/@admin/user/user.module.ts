import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { StoreModule } from '@ngrx/store';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { userReducer } from './state/user.reducer';
import { USER_STATE_NAME } from './state/user.selectors';
import { SharedModule } from '@shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent, UserUpdateComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    StoreModule.forFeature(USER_STATE_NAME, userReducer),
    EffectsModule.forFeature([UserEffects]),
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    ClipboardModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
