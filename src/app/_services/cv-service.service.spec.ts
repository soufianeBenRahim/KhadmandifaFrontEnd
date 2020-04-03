import { TestBed } from '@angular/core/testing';

import { CvServiceService } from './cv-service.service';

describe('CvServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvServiceService = TestBed.get(CvServiceService);
    expect(service).toBeTruthy();
  });
});
