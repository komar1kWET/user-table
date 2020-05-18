import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserWindowComponent } from './add-user-window.component';

describe('AddUserWindowComponent', () => {
  let component: AddUserWindowComponent;
  let fixture: ComponentFixture<AddUserWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
