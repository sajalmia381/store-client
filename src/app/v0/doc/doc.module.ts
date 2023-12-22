import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DocSidenavComponent } from './doc-sidenav/doc-sidenav.component';
import { SharedModule } from '@shared/shared.module';
import { ApiModule } from '@shared/components/api';
import { AdsenseModule } from 'ng2-adsense';
@NgModule({
  declarations: [DocComponent, DocSidenavComponent],
  imports: [CommonModule, DocRoutingModule, SharedModule, MatSidenavModule, MatIconModule, ApiModule, AdsenseModule]
})
export class DocModule {}
