import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrismComponent } from './prism.component';

import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-yaml';
// import 'prismjs/components/prism-scss';

@NgModule({
  declarations: [
    PrismComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PrismComponent
  ]
})
export class PrismModule { }
