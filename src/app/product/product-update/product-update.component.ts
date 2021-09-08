import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { Product } from '../product';
import { updateProduct } from '../state/product.actions';
import { getProductBySlug } from '../state/product.selectors';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  isAlive = true;
  productForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required)
  });;
  product!: Product | undefined | null;
  constructor(private store: Store, private router: Router, private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.store
      .select(getProductBySlug)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.product = data;
        if (data) {
          this.productForm.patchValue({
            title: data?.title,
            description: data?.description,
            price: data?.price
          });
        }
      });
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackbar.open('Form is not valid', 'close');
      return;
    }
    const formData = this.productForm.value;
    // const newFormData = { ...this.product };
    // Object.keys(formData).map(key => {
    //   if (newFormData[key] !== formData[key]) {
    //     newFormData[key] = formData[key];
    //   }
    // });
    // console.log(newFormData)
    this.store.dispatch(updateProduct({ product: formData }));
    this.router.navigate(['/products']);
  }
}
