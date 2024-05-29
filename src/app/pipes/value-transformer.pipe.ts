import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'valueTransformer',
  standalone: true
})
export class ValueTransformerPipe implements PipeTransform {

  transform(value: string): string {
    if ( !isNaN(Number.parseFloat(value)) && Number.parseFloat(value) > 0) {
      return `+${value}`;
    }
    return value;
  }
}
