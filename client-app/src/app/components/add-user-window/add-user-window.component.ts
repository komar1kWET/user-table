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
  get email() {
    return this.addUserForm.get('email');
  }
  get title() {
    return this.addUserForm.get('title');
  }
  get firstName() {
    return this.addUserForm.get('firstName');
  }
  get lastName() {
    return this.addUserForm.get('lastName');
  }

  createForm() {
    this.addUserForm = this.fb.group({
      isActive: [true],
      birthday: [null],
      title: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)], [usernameUniquenessValidator(this.userService)]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegExp)]],
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
    const user = this.addUserForm.getRawValue();
    user.id = 0;
    user.date = user.birthday ? user.birthday.toISOString().split('.')[0] : new Date().toISOString();
    this.userService.createNewUser(user)
      .subscribe(() => {
        this.close(true)
      }, (error) => {
        console.warn(error);
      })
  }

  close(update: boolean = false) {
    this.dialogRef.close();
  }
}
