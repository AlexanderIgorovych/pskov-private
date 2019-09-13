import { TestBed, inject } from '@angular/core/testing';

import { ResponsibleSaveService } from './responsible-save.service';

describe('ResponsibleSaveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponsibleSaveService]
    });
  });

  it('should be created', inject([ResponsibleSaveService], (service: ResponsibleSaveService) => {
    expect(service).toBeTruthy();
  }));
});
