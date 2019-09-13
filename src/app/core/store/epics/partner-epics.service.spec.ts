import { TestBed, inject } from '@angular/core/testing';

import { PartnerEpicsService } from './partner-epics.service';

describe('PartnerEpicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnerEpicsService]
    });
  });

  it('should be created', inject([PartnerEpicsService], (service: PartnerEpicsService) => {
    expect(service).toBeTruthy();
  }));
});
