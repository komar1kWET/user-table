import {Component, OnInit} from '@angular/core';
import {UserModel} from "@fd2/models/user.model";
import {UserService} from "@fd2/services/user.service";
import {AccountModel} from "@fd2/models/account.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserWindowComponent} from "@fd2/components/add-user-window/add-user-window.component";
import {forkJoin} from "rxjs";

const DEFAULT_UP_DIRECTION = true;
const IS_ACTIVE = 'isActive';
const USERNAME = 'username';
@Component({
  selector: 'fd2-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass']
})
export class UsersTableComponent implements OnInit {
  public usersList: UserModel[];
  public sortingField: string = IS_ACTIVE;
  public isUpDirection: boolean = DEFAULT_UP_DIRECTION;
  public isActiveProperty: string = IS_ACTIVE;
  public usernameProperty: string = USERNAME;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  applyBalanceToAccordingUser(userList: UserModel[], accounts: AccountModel[]): void {
    userList.forEach((user: UserModel) => {
      user.account = accounts.find((userInfo: AccountModel) => userInfo.ownerId === user.id);
    });
  }

  loadUsers() {
    forkJoin([this.userService.getUsers(), this.userService.getUsersBalance()])
      .subscribe((userInfo: [UserModel[], AccountModel[]]) => {
        this.usersList = userInfo[0];
        this.applyBalanceToAccordingUser(this.usersList, userInfo[1]);
      });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUserWindowComponent, dialogConfig).afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  sortByProperty(field: string): void {
    if (field === this.sortingField) {
      this.isUpDirection = !this.isUpDirection;
    } else {
      this.isUpDirection = DEFAULT_UP_DIRECTION;
    }
    this.sortingField = field;
    this.usersList.sort((a: UserModel, b: UserModel) => {
     return this.isUpDirection ? UsersTableComponent.compare(a[this.sortingField], b[this.sortingField]) : UsersTableComponent.compare(b[this.sortingField], a[this.sortingField]);
    });
  }

  private static compare(a, b) {
    return a < b ? 1 : (b < a) ? -1 : 0;
  }

  trackByUserId(index: number, user: UserModel): number{
    return user.id;
  }
}
