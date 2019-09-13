import { TestBed, inject } from '@angular/core/testing';

import { CarEpicsService } from './car-epics.service';

describe('CarEpicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarEpicsService]
    });
  });

  it('should be created', inject([CarEpicsService], (service: CarEpicsService) => {
    expect(service).toBeTruthy();
  }));
});
