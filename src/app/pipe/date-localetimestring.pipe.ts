import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datelocaletimestring',
  standalone: true,
})
export class DateToLocaleTimeStringPipe implements PipeTransform {
  transform(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
