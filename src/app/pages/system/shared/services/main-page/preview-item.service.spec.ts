import { TestBed, inject } from '@angular/core/testing';

import { PreviewItemService } from './preview-item.service';

describe('PreviewItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviewItemService]
    });
  });

  it('should be created', inject([PreviewItemService], (service: PreviewItemService) => {
    expect(service).toBeTruthy();
  }));
});
