import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [ToolbarComponent, DefaultLayoutComponent, SidenavComponent],
  imports: [CommonModule, RouterModule, MatSidenavModule, MatIconModule, MatButtonModule, MatMenuModule]
})
export class DefaultLayoutModule { }
