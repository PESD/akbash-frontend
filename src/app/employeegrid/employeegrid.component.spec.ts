import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeegridComponent } from './employeegrid.component';

describe('EmployeegridComponent', () => {
  let component: EmployeegridComponent;
  let fixture: ComponentFixture<EmployeegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
