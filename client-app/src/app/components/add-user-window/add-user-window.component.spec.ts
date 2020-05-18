import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserWindowComponent } from './add-user-window.component';
import {FormBuilder} from "@angular/forms";
import {EventEmitter, NO_ERRORS_SCHEMA} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "@fd2/services/user.service";
import {of} from "rxjs";

describe('AddUserWindowComponent', () => {
  let component: AddUserWindowComponent;
  let fixture: ComponentFixture<AddUserWindowComponent>;
  const eventEm = new EventEmitter();
  const spy = jasmine.createSpyObj('UserService', ['getUsers', 'getUsersBalance', 'getUsersEmitter', 'checkUsernameUniqueness', 'createNewUser']);
  spy.getUsers.and.returnValue(of([
    {
      birthday: '1980-03-12T00:00:00',
      email: 'kevin@gmail.com',
      firstName: 'Kevin',
      id: 1,
      isActive: true,
      lastName: 'Woods',
      title: 'Mr.',
      username: 'ranger007',
    }
  ]));
  spy.getUsersBalance.and.returnValue(of([
    {
      balance: 10,
      currency: "EUR",
      id: 1,
      ownerId: 1
    }
  ]));
  spy.getUsersEmitter.and.returnValue(eventEm);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserWindowComponent ],
      providers: [FormBuilder, {provide: MatDialogRef, useValue: {}}, {provide: UserService, useValue: spy},],
      schemas: [NO_ERRORS_SCHEMA]
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
  it('the username should have 2 symbols min', () => {
    component.addUserForm.controls['username'].setValue('a');
    expect(component.addUserForm.valid).toBeFalsy();
  });
  it('if the user enters the future date, the form should be invalid', () => {
    component.addUserForm.controls['birthday'].setValue(new Date('02.02.2021'));
    expect(component.addUserForm.valid).toBeFalsy();
  });
});
