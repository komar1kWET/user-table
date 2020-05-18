import {Component, OnInit} from '@angular/core';
import {UserModel} from "@fd2/models/user.model";
import {UserService} from "@fd2/services/user.service";
import {AccountModel} from "@fd2/models/account.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserWindowComponent} from "@fd2/components/add-user-window/add-user-window.component";

@Component({
  selector: 'fd2-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass']
})
export class UsersTableComponent implements OnInit {
  public usersList: UserModel[];
  public sortActiveUp: boolean = true;
  public sortUsernameUp: boolean = true;
  public isActiveProperty: string = 'isActive';
  public usernameProperty: string = 'username';

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: UserModel[]) => {
      this.usersList = users;
    });
    this.userService.getUsersBalance().subscribe((accounts: AccountModel[]) => {
      this.applyBalanceToAccordingUser(this.usersList, accounts);
    });
    this.userService.getUsersEmitter()
      .subscribe((usersData: [UserModel[], AccountModel[]]) => {
        this.usersList = usersData[0];
        this.applyBalanceToAccordingUser(this.usersList, usersData[1]);
      })
  }

  applyBalanceToAccordingUser(userList: UserModel[], accounts: AccountModel[]): void {
    userList.forEach((user: UserModel) => {
      user.account = accounts.find((userInfo: AccountModel) => userInfo.ownerId === user.id);
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(AddUserWindowComponent, dialogConfig);
  }

  sort(prop: string) {
    if ((prop === this.isActiveProperty && this.sortActiveUp) || (prop === this.usernameProperty && this.sortUsernameUp)) {
      this.usersList.sort((a: UserModel, b: UserModel) => {
        return a[prop] > b[prop] ? 1 : (b[prop] > a[prop]) ? -1 : 0
      })
      prop === this.isActiveProperty ? this.sortActiveUp = false : this.sortUsernameUp = false;
    } else {
      this.usersList.sort((a: UserModel, b: UserModel) => {
        return a[prop] < b[prop] ? 1 : (b[prop] < a[prop]) ? -1 : 0
      });
      prop === this.isActiveProperty ? this.sortActiveUp = true : this.sortUsernameUp = true;
    }
  }
}
