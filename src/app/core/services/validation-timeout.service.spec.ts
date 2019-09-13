import { TestBed, inject } from '@angular/core/testing';

import { ValidationTimeoutService } from './validation-timeout.service';

describe('ValidationTimeoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationTimeoutService]
    });
  });

  it('should be created', inject([ValidationTimeoutService], (service: ValidationTimeoutService) => {
    expect(service).toBeTruthy();
  }));
});
