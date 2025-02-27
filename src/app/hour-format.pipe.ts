import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourFormat',
  standalone: false
})
export class HourFormatPipe implements PipeTransform {
  transform(value: any): string {
    return `${value.toString().padStart(2, '0')}:00`;
  }
}
