import { TestBed, inject } from '@angular/core/testing';

import { WorkflowsService } from './workflows.service';

describe('WorkflowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkflowsService]
    });
  });

  it('should be created', inject([WorkflowsService], (service: WorkflowsService) => {
    expect(service).toBeTruthy();
  }));
});
