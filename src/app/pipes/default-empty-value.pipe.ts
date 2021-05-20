import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultEmptyValue',
})
export class DefaultEmptyValuePipe implements PipeTransform {
  constructor() {}

  transform(value: string | null): string | null {
    if (!value || value === null || value.trim() === '') {
      return '-';
    }
    return value;
  }
}
