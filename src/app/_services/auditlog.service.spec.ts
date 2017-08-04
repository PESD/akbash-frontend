import { TestBed, inject } from '@angular/core/testing';

import { AuditlogService } from './auditlog.service';

describe('AuditlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuditlogService]
    });
  });

  it('should be created', inject([AuditlogService], (service: AuditlogService) => {
    expect(service).toBeTruthy();
  }));
});
