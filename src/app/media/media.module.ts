import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ImageListComponent } from './image-list/image-list.component';
import { AddImageComponent } from './add-image/add-image.component';


@NgModule({
  declarations: [
    ImageListComponent,
    AddImageComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
  ],
  entryComponents: [AddImageComponent]
})
export class MediaModule { }
