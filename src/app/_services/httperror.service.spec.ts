import { TestBed, inject } from '@angular/core/testing';

import { HttperrorService } from './httperror.service';

describe('HttperrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttperrorService]
    });
  });

  it('should be created', inject([HttperrorService], (service: HttperrorService) => {
    expect(service).toBeTruthy();
  }));
});
