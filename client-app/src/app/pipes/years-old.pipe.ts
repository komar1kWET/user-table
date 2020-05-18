import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearsOld'
})
export class YearsOldPipe implements PipeTransform {

  transform(birthdayDate: string): number | string {
    const today = new Date();
    const day = Date.parse(birthdayDate);
    const birthday = new Date(day);
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const birthdayDay = birthday.getDate();
    const birthdayMonth = birthday.getMonth();
    const birthdayYear = birthday.getFullYear();
    let yearsOld;
    if (birthdayYear === currentYear) {
      yearsOld = 0;
    }
    else if (currentMonth === birthdayMonth) {
      yearsOld = currentDay >= birthdayDay ? currentYear - birthdayYear + 1 : currentYear - birthdayYear;
    } else {
      yearsOld = currentMonth < birthdayMonth ? currentYear - birthdayYear + 1 : currentYear - birthdayYear;
    }
    return yearsOld;
  }

}
