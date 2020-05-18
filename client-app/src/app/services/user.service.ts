import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "@fd2/models/user.model";
import {map} from "rxjs/operators";
import {AccountModel} from "@fd2/models/account.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
}
