import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersongridComponent } from './persongrid.component';

describe('PersongridComponent', () => {
  let component: PersongridComponent;
  let fixture: ComponentFixture<PersongridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersongridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersongridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
