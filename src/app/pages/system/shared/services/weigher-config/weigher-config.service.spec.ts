import { TestBed, inject } from '@angular/core/testing';

import { WeigherConfigService } from './weigher-config.service';

describe('WeigherConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeigherConfigService]
    });
  });

  it('should be created', inject([WeigherConfigService], (service: WeigherConfigService) => {
    expect(service).toBeTruthy();
  }));
});
