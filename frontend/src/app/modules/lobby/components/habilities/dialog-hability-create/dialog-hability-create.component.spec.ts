import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilityCreateComponent } from './dialog-hability-create.component';

describe('DialogHabilityCreateComponent', () => {
  let component: DialogHabilityCreateComponent;
  let fixture: ComponentFixture<DialogHabilityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHabilityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabilityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
