import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowchartComponent } from './workflowchart.component';

describe('WorkflowchartComponent', () => {
  let component: WorkflowchartComponent;
  let fixture: ComponentFixture<WorkflowchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
