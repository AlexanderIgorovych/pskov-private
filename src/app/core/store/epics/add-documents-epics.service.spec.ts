import { TestBed, inject } from '@angular/core/testing';

import { AddDocumentsEpicsService } from './add-documents-epics.service';

describe('AddDocumentsEpicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDocumentsEpicsService]
    });
  });

  it('should be created', inject([AddDocumentsEpicsService], (service: AddDocumentsEpicsService) => {
    expect(service).toBeTruthy();
  }));
});
