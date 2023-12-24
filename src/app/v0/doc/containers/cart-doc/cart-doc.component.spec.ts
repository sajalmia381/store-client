import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDocComponent } from './cart-doc.component';

describe('CartDocComponent', () => {
  let component: CartDocComponent;
  let fixture: ComponentFixture<CartDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CartDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
