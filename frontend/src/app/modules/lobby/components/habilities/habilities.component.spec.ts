import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitiesComponent } from './habilities.component';

describe('HabilitiesComponent', () => {
  let component: HabilitiesComponent;
  let fixture: ComponentFixture<HabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
