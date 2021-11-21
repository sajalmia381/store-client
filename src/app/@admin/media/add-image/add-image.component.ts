import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { addImage, addImageSuccess } from '../state/media.actions';
import { ImageEffects } from '../state/media.effects';
import { ImageState } from '../state/media.state';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {
  imageFile!: File;
  imagePreview!: any;
  uploaded!: boolean;

  constructor(
    private store: Store<ImageState>,
    private imageEffect: ImageEffects,
    private dialogRef: MatDialogRef<AddImageComponent>) { }

  ngOnInit(): void {
    this.imageEffect.addImage$.pipe(ofType(addImageSuccess))
      .subscribe(_ => {
        // close dialog
        // this.dialogRef.close();
        if (!this.uploaded) {
          this.uploaded = true
        }
      })
  }

  onFileSelect(event: Event) {
    this.imageFile = <File>(event.target as HTMLInputElement).files?.[0];
    const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result.toString();
    // };
    reader.readAsDataURL(this.imageFile)

    reader.onload = (event: any) => {
      this.imagePreview = (event.target as FileReader).result;
    };
  }

  onSubmit(): void {
    if (!this.imageFile) {
      alert('please select image')
      return
    }
    const fd = new FormData();
    fd.append('image', this.imageFile, this.imageFile.name)
    this.store.dispatch(addImage({ image: fd }))
  }
}
