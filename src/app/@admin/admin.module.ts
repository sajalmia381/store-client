import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRoutingModule } from './admin-routing.module';
import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    adminRoutingModule,
    LayoutModule
  ]
})
export class adminModule { }
