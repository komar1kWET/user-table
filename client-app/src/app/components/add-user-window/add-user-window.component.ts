import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "@fd2/services/user.service";
import {usernameUniquenessValidator,} from "@fd2/validators/username-validator";
import {UserModel} from "@fd2/models/user.model";
import {from} from "rxjs";
import {combineAll, map, switchMap} from "rxjs/operators";
import {AccountModel} from "@fd2/models/account.model";

@Component({
  selector: 'fd2-add-user-window',
  templateUrl: './add-user-window.component.html',
  styleUrls: ['./add-user-window.component.sass']
})
export class AddUserWindowComponent implements OnInit{
  public addUserForm;
  public titles: string[] = ['Mr.', 'Ms.', 'Mrs.', 'Miss.'];
  public emailRegExp = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  public minDate: Date = new Date(1920, 0, 1);
  public maxDate: Date = new Date(Date.now());
  private newUser: UserModel;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AddUserWindowComponent>,
      private userService: UserService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get username() {
    return this.addUserForm.get('username');
  }

  createForm() {
    this.addUserForm = this.fb.group({
      isActive: [true],
      birthday: [null],
      title: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)], [usernameUniquenessValidator(this.userService)]],
      email: [null, [Validators.required, Validators.email, Validators.pattern(this.emailRegExp)]],
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    })
  }

  isUsernameExist(): boolean {
    return this.addUserForm.get('username').hasError('usernameAlreadyExist');
  }

  save() {
    if (!this.addUserForm.valid) {
      return;
    }
    const date = this.addUserForm.value.birthday;
    this.newUser = Object.assign({}, this.addUserForm.value, { id: 0, birthday: date ? date.toISOString().split('.')[0] : new Date().toISOString() });
    this.userService.createNewUser(this.newUser)
      .pipe(switchMap(() =>
        from([this.userService.getUsers(), this.userService.getUsersBalance()])
          .pipe(map(value => value),combineAll())))
      .subscribe((users: [UserModel[], AccountModel[]]) => {
        this.userService.getUsersEmitter().emit(users)
      });
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
