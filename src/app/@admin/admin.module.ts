import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { adminRoutingModule } from './admin-routing.module';
import { LayoutModule } from './layout/layout.module';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './category/state/category.effects';
import { ImageEffects } from './media/state/media.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    adminRoutingModule,
    LayoutModule,
    EffectsModule.forFeature([CategoryEffects, ImageEffects])
  ]
})
export class adminModule {}
