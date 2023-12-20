import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { AsPrismModule } from 'as-prism';
import { MatButtonModule } from '@angular/material/button';
import { ApiDescriptionComponent } from './api-description.component';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';


@NgModule({
  declarations: [ApiComponent, ApiDescriptionComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AsPrismModule
  ],
  exports: [ApiComponent, ApiDescriptionComponent]
})
export class ApiModule { }
