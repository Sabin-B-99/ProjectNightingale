import {ElementRef, EventEmitter, Injectable} from '@angular/core';
import {Chord} from "../models/chord-model/chord";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabCreatorService {

  selectedChordsForTabs: Chord[] = [];
  selectedChordsChangedEvenEmitter: Subject<Chord[]> = new Subject<Chord[]>();
  constructor() { }

  setSelectedChords(selectedChords: Chord[]){
    this.selectedChordsForTabs = selectedChords;
    this.selectedChordsChangedEvenEmitter.next(this.selectedChordsForTabs.slice());
    this.selectedChordsForTabs.splice(0, this.selectedChordsForTabs.length);
  }
  public setCursorAt(textArea: ElementRef<HTMLTextAreaElement>, lineNo:number, col: number){
    let startPos: number = textArea.nativeElement.selectionStart;

    let textAreaLinesTillCurrentCursorPos: string[] = textArea.nativeElement.value.substring(0, startPos)
      .split('\n');

    let cursorCurrentRow: number = textAreaLinesTillCurrentCursorPos.length;

    if(cursorCurrentRow - lineNo > 1){
      textArea.nativeElement.selectionStart =
        this.findNumberOfCharacters(textAreaLinesTillCurrentCursorPos.slice(0, lineNo-1)) + 1;
      textArea.nativeElement.selectionEnd = textArea.nativeElement.selectionStart + col;
    }else if (cursorCurrentRow - lineNo < 1){
      this.addLineBreaks(textArea, lineNo - cursorCurrentRow);
      textArea.nativeElement.selectionEnd = textArea.nativeElement.selectionStart + col;
    }else{
      textArea.nativeElement.selectionStart = col;
      textArea.nativeElement.selectionEnd = col;
    }
  }

  public addLineBreaks(textAreaElem: ElementRef<HTMLTextAreaElement>, numOfBreaks: number){
    for (let i = 0; i < numOfBreaks; i++) {
      textAreaElem.nativeElement.value += '\n';
    }
  }

  public findNumberOfCharacters(lines: string[]): number{
    let totalNumberOfChars: number = 0;
    for (const line of lines) {
      totalNumberOfChars += line.length;
    }
    return totalNumberOfChars;
  }

  public calculateWordsInLyricsTab(tabTextAreaValue: string): number{
    let texAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
    console.log(texAfterWhiteSpaceRemoval);
    let totalWords: number = 0
    let tabLines: string[] =  texAfterWhiteSpaceRemoval.split('\n');
    for (const line of tabLines) {
        totalWords += this.calculateTotalWordsInALine(line);
    }
    return totalWords;
  }

  private removeWordsInsideParenthesis(line: string): string{
    return line.replace(/\s*\([^()]*\)$/, '');
  }
  private calculateTotalWordsInALine(line: string): number {
    return line.split(new RegExp(/\b\s+/)).length;
  }
  private removeBlankLinesAfterRemovingTextsInParenthesis(textAreaValue: string): string{
    let lines: string[] = textAreaValue.split('\n');
    let remLinesAfterRemoval: string[] = [];
    for (const line of lines) {
      let lineAfterRemWordsInParenthesis = this.removeWordsInsideParenthesis(line);
      if(lineAfterRemWordsInParenthesis.trim() !== ""){
        remLinesAfterRemoval.push(lineAfterRemWordsInParenthesis);
      }
    }
    return remLinesAfterRemoval.join('\n');
  }
}
