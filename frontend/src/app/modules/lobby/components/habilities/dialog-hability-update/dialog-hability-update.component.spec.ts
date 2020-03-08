import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHabilityUpdateComponent } from './dialog-hability-update.component';

describe('DialogHabilityUpdateComponent', () => {
  let component: DialogHabilityUpdateComponent;
  let fixture: ComponentFixture<DialogHabilityUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHabilityUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHabilityUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
