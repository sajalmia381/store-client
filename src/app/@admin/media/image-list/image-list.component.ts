import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DeleteConformationComponent } from '@shared/components/delete-conformation/delete-conformation.component';
import { Observable } from 'rxjs';
import { AddImageComponent } from '../add-image/add-image.component';
import { Image } from '../Image';
import { deleteImage, loadImages } from '../state/media.actions';
import { getImages, isLoaded } from '../state/media.selectors';
import { ImageState } from '../state/media.state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
    standalone: false
})
export class ImageListComponent implements OnInit {
  private store = inject<Store<ImageState>>(Store);
  private dialog = inject(MatDialog);

  images$!: Observable<Image[]>;
  isLoaded$!: Observable<boolean>;

  constructor() {
    this.images$ = this.store.select(getImages).pipe(takeUntilDestroyed());
    this.isLoaded$ = this.store.select(isLoaded).pipe(takeUntilDestroyed());
  }

  ngOnInit(): void {
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
