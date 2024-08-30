import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addOneCategory } from '../state/category.actions';
import { CategoryState } from '../state/category.state';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  private fb = inject(UntypedFormBuilder);
  private store = inject<Store<CategoryState>>(Store);

  categoryForm!: UntypedFormGroup;

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [, [Validators.required]]
    });
  }
  get name(): any {
    return this.categoryForm.get('name');
  }
  onFormSubmit(): void {
    this.store.dispatch(addOneCategory({ category: this.categoryForm.value }));
  }
}
