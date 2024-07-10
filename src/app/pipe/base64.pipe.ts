import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64',
  standalone: true,
})
export class Base64Pipe implements PipeTransform {
  transform(byteArray: Uint8Array): string {
    if (!byteArray || byteArray.length === 0) {
      return '';
    }

    const binaryString = byteArray.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    return btoa(binaryString);
  }
}
