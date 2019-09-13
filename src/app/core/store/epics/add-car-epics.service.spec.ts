import { TestBed, inject } from '@angular/core/testing';

import { AddCarEpicsService } from './add-car-epics.service';

describe('AddCarEpicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddCarEpicsService]
    });
  });

  it('should be created', inject([AddCarEpicsService], (service: AddCarEpicsService) => {
    expect(service).toBeTruthy();
  }));
});
