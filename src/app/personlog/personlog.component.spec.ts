import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonlogComponent } from './personlog.component';

describe('PersonlogComponent', () => {
  let component: PersonlogComponent;
  let fixture: ComponentFixture<PersonlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
