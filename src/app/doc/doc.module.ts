import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';
import { SidenavComponent } from '../default-layout/sidenav/sidenav.component';
import { PrismModule } from '../@plugin/prism/prism.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    DocComponent,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    DocRoutingModule,
    MatIconModule,
    PrismModule
  ]
})
export class DocModule { }
