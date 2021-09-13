import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCategories } from '../state/category.actions';
import { CategoryState } from '../state/category.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private store: Store<CategoryState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCategories())
  }

}
