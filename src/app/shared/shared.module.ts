import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DeleteConformationComponent } from './components/delete-conformation/delete-conformation.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

const commonImportedModules = [
  RouterModule,
  // Material
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ...commonImportedModules,
    FooterComponent,
    DeleteConformationComponent
  ],
  exports: [...commonImportedModules, DeleteConformationComponent, FooterComponent]
})
export class SharedModule { }
