import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PrismModule } from '../@plugin/prism/prism.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';

import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-yaml';
// import 'prismjs/components/prism-scss';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, MatIconModule, PrismModule]
})
export class HomeModule {}
