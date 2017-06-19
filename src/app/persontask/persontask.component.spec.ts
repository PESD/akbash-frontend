import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersontaskComponent } from './persontask.component';

describe('PersontaskComponent', () => {
  let component: PersontaskComponent;
  let fixture: ComponentFixture<PersontaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersontaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersontaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
