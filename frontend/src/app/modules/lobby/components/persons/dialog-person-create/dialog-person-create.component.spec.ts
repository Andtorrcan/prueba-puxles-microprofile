import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonCreateComponent } from './dialog-person-create.component';

describe('DialogPersonCreateComponent', () => {
  let component: DialogPersonCreateComponent;
  let fixture: ComponentFixture<DialogPersonCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
