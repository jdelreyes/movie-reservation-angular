import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spacedash',
  standalone: true,
})
export class SpaceToDashPipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (!value) return value;
    return value.replace(/\s+/g, '-');
  }
}
