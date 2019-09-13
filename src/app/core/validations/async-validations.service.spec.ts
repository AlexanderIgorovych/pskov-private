import { TestBed, inject } from '@angular/core/testing';

import { AsyncValidationsService } from './async-validations.service';

describe('AsyncValidationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncValidationsService]
    });
  });

  it('should be created', inject([AsyncValidationsService], (service: AsyncValidationsService) => {
    expect(service).toBeTruthy();
  }));
});
