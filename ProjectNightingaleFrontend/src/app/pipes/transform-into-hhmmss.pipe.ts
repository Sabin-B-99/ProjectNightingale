import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformIntoHHMMSS'
})
export class TransformIntoHHMMSSPipe implements PipeTransform {

  transform(durationInSecs: number): string {
    const hours: number = Math.floor(durationInSecs / 3600);
    const minutes: number = Math.floor((durationInSecs % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(durationInSecs - minutes * 60)).slice(-2);
  }
}
