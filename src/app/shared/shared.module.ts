import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CdkTreeModule } from '@angular/cdk/tree';

import { DeleteConformationComponent } from './components/delete-conformation/delete-conformation.component';

const commonImportedModules = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  // Material
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatMenuModule,
];

@NgModule({
  declarations: [
    DeleteConformationComponent
  ],
  imports: [CommonModule, ...commonImportedModules, RouterModule, MatSidenavModule, CdkTreeModule],
  exports: [...commonImportedModules, DeleteConformationComponent]
})
export class SharedModule {}
