import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDocComponent } from './auth-doc.component';

describe('AuthDocComponent', () => {
  let component: AuthDocComponent;
  let fixture: ComponentFixture<AuthDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
