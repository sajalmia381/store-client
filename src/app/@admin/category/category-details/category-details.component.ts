import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../category';
import { loadCategory } from '../state/category.actions';
import { getCategoryBySlug } from '../state/category.selectors';
import { CategoryState } from '../state/category.state';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  category$!: Observable<Category | undefined | null>;
  backendBaseUrl: string = environment.baseUrl;
  constructor(private store: Store<CategoryState>) {}

  ngOnInit(): void {
    this.category$ = this.store.select(getCategoryBySlug);
    this.store.dispatch(loadCategory());
  }
}
