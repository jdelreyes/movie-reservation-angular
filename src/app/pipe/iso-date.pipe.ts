import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isodate',
  standalone: true,
})
export class IsoStringToDateObjectPipe implements PipeTransform {
  transform(iso: string): Date {
    const b: any[] = iso.split(/\D+/);
    return new Date(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]);
  }
}
