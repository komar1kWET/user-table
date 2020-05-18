import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableComponent } from './users-table.component';
import {UserService} from "@fd2/services/user.service";
import {YearsOldPipe} from "@fd2/pipes/years-old.pipe";
import {MatDialog} from "@angular/material/dialog";
import {of} from "rxjs";
import {EventEmitter} from "@angular/core";

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;
  const eventEm = new EventEmitter();
  const spy = jasmine.createSpyObj('UserService', ['getUsers', 'getUsersBalance', 'getUsersEmitter']);
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
      declarations: [ UsersTableComponent, YearsOldPipe ],
      providers: [
        { provide: MatDialog, useValue: {} },
        { provide: UserService, useValue: spy },
      ]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one user', () => {
    expect(component.usersList.length).toEqual(1);
  });

  it('html should render one user in the table', () => {
    const element = fixture.nativeElement.querySelector('.username');
    expect(element.innerText).toContain('ranger007');
  });
});
