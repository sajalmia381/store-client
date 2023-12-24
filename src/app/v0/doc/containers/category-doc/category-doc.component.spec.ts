import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDocComponent } from './category-doc.component';

describe('CategoryDocComponent', () => {
  let component: CategoryDocComponent;
  let fixture: ComponentFixture<CategoryDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
