import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import * as categorySelectors from '../../category/state/category.selectors';
import { takeWhile } from 'rxjs/operators';
import { loadCategories } from 'src/app/category/state/category.actions';
import { Category } from 'src/app/category/category';
import { addProduct } from '../state/product.actions';
import { Image } from 'src/app/media/Image';
import { ImageState } from 'src/app/media/state/media.state';
import { HttpService } from '@shared/services/http.service';
import { addImageSuccess } from 'src/app/media/state/media.actions';
import { environment } from '@env/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;
  productForm!: FormGroup;
  categories: Category[] = [];
  // Image
  uploadedImage!: Image | null;
  baseUrl: string = environment.baseUrl;
  constructor(private store: Store<ProductState | ImageState>, private snackBar: MatSnackBar, private httpService: HttpService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl(''),
      category: new FormControl('', Validators.required),
      image: new FormControl(''),
      imageSource: new FormControl('')
    })
    this.fetchCategory();
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }
  
  fetchCategory(): void {
    this.store.select(categorySelectors.getCategories)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.categories = data;
      })
    this.store.dispatch(loadCategories());
  }
  
  get title(): any {
    return this.productForm.get('title')
  }
  get price(): any {
    return this.productForm.get('price')
  }
  get image(): any {
    return this.productForm.get('image')
  }
  get description(): any {
    return this.productForm.get('description')
  }
  get category(): any {
    return this.productForm.get('category')
  }
  
  // Image
  onFileSelect(event: Event) {
    const file = <File>(event.target as HTMLInputElement).files?.[0];
    if (file) {
      const fd = new FormData();
      fd.append('image', file, file.name)
      this.httpService.upload('/images', fd).subscribe(res => {
        const image: Image = res.data;
        // this.productForm.get('image')?.setValue(image.webUrl);
        this.productForm.get('imageSource')?.setValue(image._id);
        this.uploadedImage = image;
        this.store.dispatch(addImageSuccess({image}));
      })
    }
  }
  onImageDelete(): void {
    this.httpService.delete('/images/' + this.uploadedImage?._id).subscribe(res => {
      this.uploadedImage = null;
    })
  }
  
  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackBar.open('Product form is not valid', 'Close', {
        duration: 2000
      })
      return
    }
    this.store.dispatch(addProduct({product: this.productForm.value}))
  }
}
