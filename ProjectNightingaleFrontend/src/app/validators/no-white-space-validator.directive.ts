import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
export function noWhiteSpaceValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    let inputValue: string = (control.value || '').trim();
    return (inputValue.length > 0) ? null: {'whitespaceValidationFailed:': true};
  }
}
