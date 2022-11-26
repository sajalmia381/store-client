import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
