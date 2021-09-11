import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addOneProduct } from '../state/product.actions';
import { ProductState } from '../state/product.state';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categories = [{_id: 'hello', name: 'shoes', slug: 'shoes'},{_id: 'hello', name: 'cloth', slug: 'cloth'}]
  
  constructor(private store: Store<ProductState>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('', Validators.required),
    })
  }
  
  get title(): any {
    return this.productForm.get('title')
  }
  get price(): any {
    return this.productForm.get('price')
  }
  get description(): any {
    return this.productForm.get('description')
  }
  get category(): any {
    return this.productForm.get('category')
  }
  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackBar.open('Product form is not valid', 'Close', {
        duration: 2000
      })
      return
    }
    this.store.dispatch(addOneProduct({product: this.productForm.value}))
  }
}
