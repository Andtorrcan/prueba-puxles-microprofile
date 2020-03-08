import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonUpdateComponent } from './dialog-person-update.component';

describe('DialogPersonUpdateComponent', () => {
  let component: DialogPersonUpdateComponent;
  let fixture: ComponentFixture<DialogPersonUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPersonUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
