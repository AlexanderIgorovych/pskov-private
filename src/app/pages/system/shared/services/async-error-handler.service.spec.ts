import { TestBed, inject } from '@angular/core/testing';

import { AsyncErrorHandlerService } from './async-error-handler.service';

describe('AsyncErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsyncErrorHandlerService]
    });
  });

  it('should be created', inject([AsyncErrorHandlerService], (service: AsyncErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
