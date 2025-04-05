import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { isSignedIn } from 'src/app/v0/auth/state/auth.selectors';
import { Category } from '../../category/category';
import { loadCategories } from '../../category/state/category.actions';
import { getCategories } from '../../category/state/category.selectors';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Product } from '../product';
import { updateProduct } from '../state/product.actions';
import { getProductBySlug } from '../state/product.selectors';
import { Image } from 'src/app/@admin/media/Image';
import { HttpService } from '@shared/services/http.service';
import { addImageSuccess } from '../../media/state/media.actions';
import { loadProduct } from '../state/product.actions';
import { filterValidObjAttribute } from '@shared/helper/utils';

@Component({
    selector: 'app-product-update',
    templateUrl: './product-update.component.html',
    styleUrls: ['./product-update.component.scss'],
    standalone: false
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private fb = inject(UntypedFormBuilder);
  private userService = inject(UserService);
  private httpService = inject(HttpService);

  isAlive = true;
  isLoggedIn!: boolean;
  users!: User[];
  categories: Category[] = [];
  uploadedImage!: Image | null;
  baseUrl: string = environment.baseUrl;
  productUpdated?: boolean;
  productForm: UntypedFormGroup = new UntypedFormGroup({
    title: new UntypedFormControl(null, Validators.required),
    description: new UntypedFormControl(null, Validators.required),
    price: new UntypedFormControl(null, Validators.required)
  });
  product!: Product | undefined | null;
  constructor() {
    this.productForm = this.fb.group({
      slug: ['', Validators.required],
      title: ['', Validators.required],
      price: [, Validators.required],
      description: [''],
      category: ['', Validators.required],
      image: [''],
      imageSource: [''],
      createdBy: ['']
    });
  }

  ngOnInit(): void {
    this.store
      .select(isSignedIn)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(bol => (this.isLoggedIn = bol));
    this.store.dispatch(loadProduct());
    this.store
      .select(getProductBySlug)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(data => {
        this.product = data;
        if (data) {
          this.productForm.patchValue({
            slug: data?.slug,
            title: data?.title,
            description: data?.description,
            price: data?.price,
            category: data?.category?._id,
            createdBy: data?.createdBy?._id,
            image: data?.image,
            imageSource: data?.imageSource
          });
        }
      });
    this.fetchCategory();
    if (this.isLoggedIn) {
      this.fetchUsers();
    }
  }
  ngOnDestroy(): void {
    this.isAlive = false;
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
  onFormSubmit(): void {
    if (this.productForm.invalid) {
      this.snackbar.open('Form is not valid', 'close');
      return;
    }
    const formData = this.productForm.value;
    this.store.dispatch(updateProduct({ product: formData }));
    this.router.navigate(['/admin/products']);
  }
  fetchCategory(): void {
    this.store
      .select(getCategories)
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
}
