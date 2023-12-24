import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDocComponent } from './intro-doc.component';

describe('IntroDocComponent', () => {
  let component: IntroDocComponent;
  let fixture: ComponentFixture<IntroDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
