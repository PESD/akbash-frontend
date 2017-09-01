import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferformComponent } from './transferform.component';

describe('TransferformComponent', () => {
  let component: TransferformComponent;
  let fixture: ComponentFixture<TransferformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
