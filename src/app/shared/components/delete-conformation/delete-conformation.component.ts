import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-delete-conformation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-conformation.component.html',
  styleUrls: ['./delete-conformation.component.scss']
})
export class DeleteConformationComponent implements OnInit {
  message: string = 'Are you sure?';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteConformationComponent>
  ) {
    if (data) {
      this.message = data.message || this.message;
    }
  }
  ngOnInit(): void { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
