import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';
import { PrismModule } from '../@plugin/prism/prism.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DocSidenavComponent } from './doc-sidenav/doc-sidenav.component';

@NgModule({
  declarations: [DocComponent, DocSidenavComponent],
  imports: [CommonModule, DocRoutingModule, MatSidenavModule, MatIconModule, PrismModule]
})
export class DocModule {}
