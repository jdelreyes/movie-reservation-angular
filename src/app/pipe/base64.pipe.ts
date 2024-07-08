import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64',
  standalone: true,
})
export class Base64Pipe implements PipeTransform {
  transform(byteArray: Uint8Array): string {
    if (!byteArray || byteArray.length === 0) {
      console.log('empty');
      return '';
    }

    const binaryString = byteArray.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
    }, '');

    const base64String = btoa(binaryString);

    const mimeType = 'image/jpeg';
    return `data:${mimeType};base64,${base64String}`;
  }
}
