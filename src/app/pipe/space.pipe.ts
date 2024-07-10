import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space',
  standalone: true,
})
export class SpacePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    return value?.replace(/_/g, ' ');
  }
}
