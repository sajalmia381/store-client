import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../category';
import { Store } from '@ngrx/store';
import { CategoryState } from '../state/category.state';
import { updateCategory, updateCategorySuccess } from '../state/category.actions';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-category-update',
    templateUrl: './category-update.component.html',
    styleUrls: ['./category-update.component.scss'],
    standalone: false
})
export class CategoryUpdateComponent implements OnInit {
  private category = inject<Category>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<CategoryUpdateComponent>>(MatDialogRef);

  private _fb = inject(FormBuilder);
  private store = inject<Store<CategoryState>>(Store);
  private _snackbar = inject(MatSnackBar);
  private _action$ = inject(Actions);

  form = this._fb.group({
    name: ['', [Validators.required]]
  });

  private readonly addSuccess$ = this._action$.pipe(ofType(updateCategorySuccess), takeUntilDestroyed());

  constructor() {
    this.addSuccess$.subscribe(res => {
      this._snackbar.open('Successfully: Todo Added', 'Close', {
        duration: 5000
      });
      this.dialogRef.close(res.category);
    });
  }

  ngOnInit(): void {
    this.form.patchValue({ name: this.category.name });
  }

  onSubmit(): void {
    const formData = this.form.value;
    this.store.dispatch(updateCategory({ slug: this.category.slug, _id: this.category._id, payload: { name: formData.name as string } }));
  }
}
