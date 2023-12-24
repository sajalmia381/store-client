import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { V1RoutingModule } from './v1-routing.module';
import { V1Component } from './v1.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { ToolbarComponent } from './core/toolbar/toolbar.component';
import { SidenavComponent } from './core/sidenav/sidenav.component';

@NgModule({
  declarations: [V1Component, ToolbarComponent, SidenavComponent],
  imports: [CommonModule, V1RoutingModule, RouterModule, MatSidenavModule, MatMenuModule, SharedModule],
  exports: [ToolbarComponent, SidenavComponent]
})
export class V1Module {}
