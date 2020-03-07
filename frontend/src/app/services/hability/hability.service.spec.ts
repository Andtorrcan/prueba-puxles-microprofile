import { TestBed } from '@angular/core/testing';

import { HabilityService } from './hability.service';

describe('HabilityService', () => {
  let service: HabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
