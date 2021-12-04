import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { AddImageComponent } from '../add-image/add-image.component';
import { Image } from '../Image';
import { deleteImage, loadImages } from '../state/media.actions';
import { getImages, isLoaded } from '../state/media.selectors';
import { ImageState } from '../state/media.state';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent implements OnInit {
  images$!: Observable<Image[]>;
  isLoaded$!: Observable<boolean>;

  constructor(private store: Store<ImageState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.images$ = this.store.select(getImages);
    this.isLoaded$ = this.store.select(isLoaded);
    this.store.dispatch(loadImages());
  }
  onImageForm(): void {
    const DialogRef = this.dialog.open(AddImageComponent, {
      width: '100%',
      maxWidth: '400px'
    });
  }
  onDelete(image: Image): void {
    const deleteDialogRef = this.dialog.open(DeleteConformationComponent, {
      width: '100%',
      maxWidth: '400px',
      data: {
        message: 'Are you sure! you want to delete ' + image.name + '?'
      }
    });
    deleteDialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.store.dispatch(deleteImage({ id: image?._id }));
      }
    });
  }
}
