import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { ProductState } from '../state/product.state';
import * as categorySelectors from '../../category/state/category.selectors';
import { takeWhile, tap } from 'rxjs/operators';
import { loadCategories } from 'src/app/@admin/category/state/category.actions';
import { Category } from 'src/app/@admin/category/category';
import { addProduct } from '../state/product.actions';
import { Image } from 'src/app/@admin/media/Image';
import { ImageState } from 'src/app/@admin/media/state/media.state';
import { HttpService } from '@shared/services/http.service';
import { addImageSuccess } from 'src/app/@admin/media/state/media.actions';
import { environment } from '@env/environment';
import { Actions, ofType } from '@ngrx/effects';
import * as productActions from '../state/product.actions';
import { filterValidObjAttribute } from '@shared/helper/utils';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { AuthState } from 'src/app/v0/auth/state/auth.state';
import { isSignedIn } from 'src/app/v0/auth/state/auth.selectors';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  isAlive: boolean = true;
  productForm!: UntypedFormGroup;
  categories: Category[] = [];
  // Image
  uploadedImage!: Image | null;
  baseUrl: string = environment.baseUrl;
  productUpdated?: boolean;
  isLoggedIn!: boolean;
  users: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<ProductState | ImageState | AuthState>,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private action$: Actions,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.store
      .select(isSignedIn)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(bol => (this.isLoggedIn = bol));
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [, Validators.required],
      description: [''],
      category: ['', Validators.required],
      image: [''],
      imageSource: [''],
      createdBy: ['']
    });
    this.fetchCategory();
    if (this.isLoggedIn) {
      this.fetchUsers();
    }
    this.action$
      .pipe(
        takeWhile(() => this.isAlive),
        ofType(productActions.addProductSuccess)
      )
      .subscribe(_ => {
        this.productUpdated = true;
        this.productForm.reset();
        this.uploadedImage = null;
      });
  }
  ngOnDestroy(): void {
    this.isAlive = false;
  }

  fetchCategory(): void {
    this.store
      .select(categorySelectors.getCategories)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.categories = data;
      });
    this.store.dispatch(loadCategories());
  }
  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  get title(): any {
    return this.productForm.get('title');
  }
  get price(): any {
    return this.productForm.get('price');
  }
  get image(): any {
    return this.productForm.get('image');
  }
  get description(): any {
    return this.productForm.get('description');
  }
  get category(): any {
    return this.productForm.get('category');
  }
  get createdBy(): any {
    return this.productForm.get('createdBy');
  }

  // Image
  onFileSelect(event: Event) {
    const file = <File>(event.target as HTMLInputElement).files?.[0];
    if (file) {
      const fd = new FormData();
      fd.append('image', file, file.name);
      this.httpService.upload('/images', fd).subscribe(res => {
        const image: Image = res.data;
        // this.productForm.get('image')?.setValue(image.webUrl);
        this.productForm.get('imageSource')?.setValue(image._id);
        this.uploadedImage = image;
        this.store.dispatch(addImageSuccess({ image }));
      });
    }
  }
  onImageDelete(): void {
    this.httpService.delete('/images/' + this.uploadedImage?._id).subscribe(res => {
      this.uploadedImage = null;
    });
  }

  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackBar.open('Product form is not valid', 'Close', {
        duration: 2000
      });
      return;
    }
    this.store.dispatch(addProduct({ product: filterValidObjAttribute(this.productForm.value) }));
  }
}
