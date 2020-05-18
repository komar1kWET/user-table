import {FormControl} from "@angular/forms";
import {UserService} from "@fd2/services/user.service";
import {timer} from "rxjs";
import {map, switchMap} from "rxjs/operators";

export const usernameUniquenessValidator = (userService: UserService, delay: number = 500) => {
  return (input: FormControl) => {
    return timer(delay).pipe(
      switchMap(() => userService.checkUsernameUniqueness(input.value)),
      map(res => {
        return res ? null : {usernameAlreadyExist: true};
      })
    );
  };
};



