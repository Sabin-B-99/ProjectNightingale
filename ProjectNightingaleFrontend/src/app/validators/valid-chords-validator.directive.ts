import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function chordsValidator(validChordsList: string[]): ValidatorFn{
  return (control: AbstractControl): ValidationErrors| null =>{
    let lyrics: string = control.value;
    let invalidChords: string[] = [];

    let extractedChords: string[] = [];

    let extractedChord: string = '';
    let text: string[] = lyrics.split('[');
    for (let i = 0; i < text.length; i++) {
      extractedChord = text[i].split(']')[0];
      if(extractedChord !== text[i] && extractedChord.trim().length  > 0){
        extractedChords.push(extractedChord);
      }
    }

    for (const chord of extractedChords) {
      if(validChordsList.indexOf(chord) === -1){
        invalidChords.push(chord)
      }
    }
    return  invalidChords.length === 0 ? null : {'invalidChordsInLyrics': invalidChords.slice()};
  }
}
