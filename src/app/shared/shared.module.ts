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

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
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
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
    DeleteConformationComponent
  ],
  imports: [CommonModule, ...commonImportedModules, RouterModule, MatSidenavModule],
  exports: [...commonImportedModules, LayoutComponent, HeaderComponent, SidenavComponent, DeleteConformationComponent]
})
export class SharedModule {}
