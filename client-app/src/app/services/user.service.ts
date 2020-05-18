import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "@fd2/models/user.model";
import {map} from "rxjs/operators";
import {AccountModel} from "@fd2/models/account.model";
import {SortObjectModel} from "@fd2/models/sort-object.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersEmitter = new EventEmitter<[UserModel[], AccountModel[]]>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('https://localhost:5001/api/users')
  }
  getUsersBalance(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>('https://localhost:5001/api/accounts')
  }
  checkUsernameUniqueness(username: string): Observable<boolean> {
    return this.http.get(`https://localhost:5001/api/users/${username}/uniqueness`)
      .pipe(
        map((response: boolean) => {
          return response;
        }))
  }
  createNewUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('https://localhost:5001/api/users', user);
  }

  sort(sortObject: SortObjectModel): void {
    // if ((sortObject.prop === sortObject.firstProperty && sortObject.firstCondition) || (sortObject.prop === sortObject.secondProperty && sortObject.secondCondition)) {
    //   sortObject.data.sort((a, b) => {
    //     return a[sortObject.prop] > b[sortObject.prop] ? 1 : (b[sortObject.prop] > a[sortObject.prop]) ? -1 : 0
    //   })
    //   sortObject.prop === sortObject.firstProperty ? sortObject.firstCondition = false : sortObject.secondCondition = false;
    // } else {
    //   sortObject.data.sort((a, b) => {
    //     return a[sortObject.prop] < b[sortObject.prop] ? 1 : (b[sortObject.prop] < a[sortObject.prop]) ? -1 : 0
    //   });
    //   sortObject.prop === sortObject.firstProperty ? sortObject.firstCondition = true : sortObject.secondCondition = true;
    // }
  }
}
