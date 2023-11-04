import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { DocComponent } from './doc.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DocSidenavComponent } from './doc-sidenav/doc-sidenav.component';
import { SharedModule } from '@shared/shared.module';
import { AsPrismModule} from 'as-prism';

@NgModule({
  declarations: [DocComponent, DocSidenavComponent],
  imports: [CommonModule, DocRoutingModule, SharedModule, MatSidenavModule, MatIconModule, AsPrismModule]
})
export class DocModule { }
