import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ImageListComponent } from './image-list/image-list.component';
import { AddImageComponent } from './add-image/add-image.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ImageListComponent, AddImageComponent],
  imports: [CommonModule, MediaRoutingModule, SharedModule, MatDialogModule]
})
export class MediaModule {}
