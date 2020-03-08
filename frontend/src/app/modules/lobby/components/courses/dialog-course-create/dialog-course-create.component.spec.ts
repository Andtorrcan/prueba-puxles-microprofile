import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCourseCreateComponent } from './dialog-course-create.component';

describe('DialogCourseCreateComponent', () => {
  let component: DialogCourseCreateComponent;
  let fixture: ComponentFixture<DialogCourseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCourseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCourseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
