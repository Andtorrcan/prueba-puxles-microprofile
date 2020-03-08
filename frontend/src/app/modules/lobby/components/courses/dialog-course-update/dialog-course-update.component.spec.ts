import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCourseUpdateComponent } from './dialog-course-update.component';

describe('DialogCourseUpdateComponent', () => {
  let component: DialogCourseUpdateComponent;
  let fixture: ComponentFixture<DialogCourseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCourseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCourseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
