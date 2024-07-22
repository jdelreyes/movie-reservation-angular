import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datestring',
  standalone: true,
})
export class DateToDateStringPipe implements PipeTransform {
  transform(date: Date): string {
    return `${date.toDateString()}`;
  }
}
