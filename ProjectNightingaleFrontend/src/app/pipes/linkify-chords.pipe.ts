import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'linkifyChords'
})
export class LinkifyChordsPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }
  transform(value: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(this.linkifyChords(value));
  }

  private linkifyChords(lyrics: string): string{
    let linkedLyrics: string = '';
    for (let i:number = 0; i < lyrics.length; i++) {
      linkedLyrics = linkedLyrics.concat(lyrics.at(i) || '');
      if(lyrics.at(i) === "["){
        linkedLyrics = linkedLyrics.concat("<span id='chordName' role='button' class='text-primary'>");
      }
      if(lyrics.at(i+1) === "]"){
        linkedLyrics = linkedLyrics.concat("</span>");
      }
    }
    return linkedLyrics;
  }
}
