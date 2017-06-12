import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonstatusComponent } from './personstatus.component';

describe('PersonstatusComponent', () => {
  let component: PersonstatusComponent;
  let fixture: ComponentFixture<PersonstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
