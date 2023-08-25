import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function lyricsBracketsValidation(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>{
    let lyrics: string = control.value;
    let bracketsStack: string[] = [];
    let currentChar: string = '';
    let poppedChar: string = '';
    let currentCharIsOpeningBracket: boolean = false;
    let currentCharIsClosingBracket: boolean = false;

    let numberOfUnbalancedBrackets: number = 0;
    let numberOfClosingBracketsWithNoOpenings: number = 0;
    let parenthesisMatch: boolean = false;

    for (let i = 0; i < lyrics.length; i++) {
      currentChar = lyrics.at(i) || '';
      currentCharIsOpeningBracket = (currentChar === '(' || currentChar === '{' || currentChar === '[');
      currentCharIsClosingBracket =(currentChar === ')' ||  currentChar === '}' || currentChar === ']');

      if (currentCharIsOpeningBracket){
        bracketsStack.push(currentChar);
        numberOfUnbalancedBrackets  += 1;
        if(numberOfClosingBracketsWithNoOpenings > bracketsStack.length){
          numberOfClosingBracketsWithNoOpenings -= 1;
        }
      }
      if(currentCharIsClosingBracket){
         poppedChar = bracketsStack.pop() || '';
         if(poppedChar !== ''){
           if(poppedChar === '(' && currentChar === ')'){
             parenthesisMatch = true;
           }else if( poppedChar === '{' && currentChar === '}'){
             parenthesisMatch = true;
           }else {
             parenthesisMatch = (poppedChar === '[' && currentChar === ']');
           }
           if (parenthesisMatch){
             numberOfUnbalancedBrackets -= 1;
           }
         }else {
           numberOfClosingBracketsWithNoOpenings += 1;
         }
      }
    }
    return ((numberOfUnbalancedBrackets === 0 && numberOfClosingBracketsWithNoOpenings === 0) ? null:  {bracketsMismatch: true});
  }
}
