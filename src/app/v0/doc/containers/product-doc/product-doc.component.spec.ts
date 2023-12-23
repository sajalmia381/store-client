import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDocComponent } from './product-doc.component';

describe('ProductDocComponent', () => {
  let component: ProductDocComponent;
  let fixture: ComponentFixture<ProductDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
