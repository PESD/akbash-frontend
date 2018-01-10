import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorgridComponent } from './contractorgrid.component';

describe('ContractorgridComponent', () => {
  let component: ContractorgridComponent;
  let fixture: ComponentFixture<ContractorgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
