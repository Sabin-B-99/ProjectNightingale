import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'musicNote'
})
export class MusicNotePipe implements PipeTransform {

  readonly flatSymbolAsciiValue: number = 9837;
  readonly sharpSymbolAsciiValue: number = 9839;
  readonly flatSymbolInString: string = 'flat';
  readonly sharpSymbolInString:string = 'sharp';
  transform(value: string): string {
    if(value.substring(1, value.length).toLowerCase().includes(this.flatSymbolInString)){
      return value.substring(0, 1).concat(String.fromCharCode(this.flatSymbolAsciiValue));
    }

    if(value.substring(1, value.length).toLowerCase().includes(this.sharpSymbolInString)){
      return value.substring(0,1).concat(String.fromCharCode(this.sharpSymbolAsciiValue));
    }
    return value;
  }

}
