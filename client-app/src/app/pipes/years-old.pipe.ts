import { Pipe, PipeTransform } from '@angular/core';

const seconds: number = 1000;
const days: number = 24;
const hours: number = 3600;
const years: number = 365.25;
@Pipe({
  name: 'yearsOld'
})
export class YearsOldPipe implements PipeTransform {

  transform(birthdayDate: string): number {
    return ((new Date().getTime() - new Date(birthdayDate).getTime()) / (seconds * hours * days * years)) | 0;
  }
}
