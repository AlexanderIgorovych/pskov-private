import { TestBed, inject } from '@angular/core/testing';

import { TabSwitcherService } from './tab-switcher.service';

describe('TabSwitcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabSwitcherService]
    });
  });

  it('should be created', inject([TabSwitcherService], (service: TabSwitcherService) => {
    expect(service).toBeTruthy();
  }));
});
