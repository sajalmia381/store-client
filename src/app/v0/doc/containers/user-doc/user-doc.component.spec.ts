import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDocComponent } from './user-doc.component';

describe('UserDocComponent', () => {
  let component: UserDocComponent;
  let fixture: ComponentFixture<UserDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDocComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
