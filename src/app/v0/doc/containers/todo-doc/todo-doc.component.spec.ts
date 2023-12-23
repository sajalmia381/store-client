import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDocComponent } from './todo-doc.component';

describe('TodoDocComponent', () => {
  let component: TodoDocComponent;
  let fixture: ComponentFixture<TodoDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
