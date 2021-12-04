import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { DeleteConformationComponent } from './components/delete-conformation/delete-conformation.component';

const commonImportedModules = [
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  // Material
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [DeleteConformationComponent],
  imports: [CommonModule, ...commonImportedModules, RouterModule, MatDialogModule],
  exports: [...commonImportedModules, DeleteConformationComponent]
})
export class SharedModule {}
