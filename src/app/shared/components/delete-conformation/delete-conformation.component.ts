
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IDeleteConformation } from './delete-conformation.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-conformation',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatProgressBarModule, MatIconModule],
  templateUrl: './delete-conformation.component.html',
  styleUrls: ['./delete-conformation.component.scss']
})
export class DeleteConformationComponent {
  private data = inject<Partial<IDeleteConformation>>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<DeleteConformationComponent>>(MatDialogRef);

  @Input() isSubmitting: boolean = false;

  message: string = 'Are you sure?';

  // dialog Config
  config: IDeleteConformation = {
    // Static Props
    message: 'Are you sure!',
    successBtnText: 'Delete',
    cancelBtnText: 'Cancel'
  };

  constructor() {
    const data = this.data;
    const dialogRef = this.dialogRef;

    dialogRef.disableClose = true;
    const { successBtnText, cancelBtnText, message } = data;
    if (successBtnText !== undefined) {
      this.config.successBtnText = successBtnText;
    }
    if (cancelBtnText !== undefined) {
      this.config.cancelBtnText = cancelBtnText;
    }

    if (message !== undefined) {
      this.message = message;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
