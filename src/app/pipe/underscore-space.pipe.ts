import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscorespace',
  standalone: true,
})
export class UnderscoreToSpacePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    return value?.replace(/_/g, ' ');
  }
}
