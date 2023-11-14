import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatetime'
})
export class FormatDatetimePipe implements PipeTransform {

  transform(commaSpeDateTime: string | undefined): string {
    let formattedDateTime: string = ''

    if(!commaSpeDateTime){
      return 'INVALID DATE. Accepted format example: yyyy,mm,dd,hh,mm,ss';
    }

    if(commaSpeDateTime.length < 6){
      return 'INVALID DATE. Accepted format example: yyyy,mm,dd,hh,mm,ss ';
    }

    formattedDateTime = `${commaSpeDateTime[0]}-${commaSpeDateTime[1]}-${commaSpeDateTime[2]}  |
    ${commaSpeDateTime[3]}:${commaSpeDateTime[4]}:${commaSpeDateTime[5]}`
    return formattedDateTime;
  }

}
