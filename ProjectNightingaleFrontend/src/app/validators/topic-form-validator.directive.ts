import {AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {IChordChanges, IChords} from "../types/song-interfaces";

export function topicFormAtLeastOneFieldRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let topicSongTitleField: string = control.get('topicSongTitle')?.value;
    let topicChordsField: IChords[] = control.get('topicChords')?.value;
    let topicChordChangesField: IChordChanges[] = control.get('topicChordChanges')?.value;
    let topicStrumPatternsField: string[] = (control.get('strumPatterns')as FormArray<FormControl<string|null>>)
      .controls.map((control: FormControl<string| null>) =>{
        return control.value || '';
      })
    let valid: boolean = (topicSongTitleField.trim().length > 0) || (topicChordsField.length > 0)
      || (topicChordChangesField.length > 0) || topicStrumPatternsField.length > 0;

    return (valid) ?  null : {topicFormInvalid: true};
  }}
