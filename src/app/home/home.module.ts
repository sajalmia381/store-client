import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PrismModule } from '../@plugin/prism/prism.module';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    PrismModule,
  ]
})
export class HomeModule { }
