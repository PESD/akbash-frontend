import { TestBed, inject } from '@angular/core/testing';

import { WorkflowtaskService } from './workflowtask.service';

describe('WorkflowtaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowtaskService]
    });
  });

  it('should be created', inject([WorkflowtaskService], (service: WorkflowtaskService) => {
    expect(service).toBeTruthy();
  }));
});
