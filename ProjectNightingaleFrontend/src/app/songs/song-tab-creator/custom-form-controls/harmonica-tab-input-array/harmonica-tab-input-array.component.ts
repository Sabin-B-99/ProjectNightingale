import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ICellNumber, ITableFormCellValue} from "../../../../types/custom-interfaces";

@Component({
  selector: 'app-harmonica-tab-input-array',
  templateUrl: './harmonica-tab-input-array.component.html',
  styleUrls: ['./harmonica-tab-input-array.component.css'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: HarmonicaTabInputArrayComponent
  }]
})
export class HarmonicaTabInputArrayComponent implements ControlValueAccessor, OnInit, AfterContentInit{

  @Input() numOfRows: number;
  @Input() numOfCols: number;
  @Input() lyricLines: Map<number, string>;


  harmonicaTabInput: number[][] = [];
  harmonicaLyricsWordsInEachLine: string[][];



  onChange : (tableCellValues: ITableFormCellValue[]) => void
    = (tableCellValues: ITableFormCellValue[]): void => {};
  onTouched: () => void = (): void =>{};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  tableValues: ITableFormCellValue[] = [];

  constructor() {
  }

  ngOnInit() {
    if(this.lyricLines){
      this.harmonicaLyricsWordsInEachLine = this.buildLyricsWords(this.lyricLines);
    }
    for (let i = 0; i < this.numOfRows; i++) {
      this.harmonicaTabInput.push([]);
      for (let j = 0; j < this.numOfCols; j++) {
        this.harmonicaTabInput.at(i)?.push(j);
      }
    }
  }

   ngAfterContentInit() {
    if (this.harmonicaLyricsWordsInEachLine){
       this.tableValues.push(...(this.initializeWords()));
       this.onChange(this.tableValues);
    }
  }

  private initializeWords(): ITableFormCellValue[]{
    let cellValues: ITableFormCellValue[] = [];
    for (let i :number= 0; i < this.numOfRows; i++) {
      for (let j: number = 0; j < this.numOfCols; j++) {
        let wordToAdd: string = this.getWordAt(i,j);
        if(wordToAdd.trim().length > 0){
          let cellValue: ITableFormCellValue = {
            value: wordToAdd,
            cellNum: this.findActualRowAndColInTableInView(i,j)
          }
          cellValues.push(cellValue);
        }
      }
    }
    return cellValues;
  }

  private buildLyricsWords(lyrics: Map<number, string>): string[][]{
    let totalNoOfLines: number = lyrics.size;
    let line: string | undefined;
    let wordsInEachLine: string[];
    let wordsInLyrics: string[][] = [];
    for (let i = 0; i < totalNoOfLines; i++) {
      line = lyrics.get(i);
      if(line){
        wordsInEachLine = this.getWordsInLine(line);
        wordsInLyrics.push(wordsInEachLine);
      }
    }
    return wordsInLyrics;
  }

  addCellValue($event: Event, row: number, col: number) {
    const cellValue: string = (<HTMLInputElement>$event.target).value;
    this.markAsTouched();
    if(!this.isDisabled){
      if(cellValue.trim().length > 0 && !this.findIfExistsAndReplaceValueAt(row, col, cellValue)){
        this.tableValues.push(
          {
            value: cellValue,
            cellNum: {
              row: row,
              col: col
            }
          }
        );
      }

      if(cellValue.trim().length === 0){
        this.remCellsReplacedWithWhiteSpaceVal(row,col);
      }
      this.onChange(this.tableValues);
    }
  }

  private findIfExistsAndReplaceValueAt(row: number, col: number, valueToReplaceWith: string){
    let replaced: boolean = false;
    for (const cellValue of this.tableValues) {
      if(valueToReplaceWith.trim().length > 0 && cellValue.cellNum.row === row && cellValue.cellNum.col === col){
        cellValue.value = valueToReplaceWith;
        replaced = true;
      }
    }
    return replaced;
  }

  private remCellsReplacedWithWhiteSpaceVal(row: number, col: number){
    let indexToRemove: number = 0;
    for (const cellValue of this.tableValues) {
      if(cellValue.cellNum.row === row && cellValue.cellNum.col === col){
        this.tableValues.splice(indexToRemove, 1);
      }
      indexToRemove += 1;
    }
  }

  writeValue(tableValues: ITableFormCellValue[]): void {
    this.tableValues = tableValues;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


  private markAsTouched(){
    if(!this.isTouched){
      this.onTouched();
      this.isTouched = true;
    }
  }

  private getWordsInLine(line: string): string[] {
    return line.split(/\b\s+/);
  }

  get harmonicaTabInputRow(){
    return this.harmonicaTabInput;
  }

  private getWordAt(row: number, col: number) {
    let word: string | undefined =  this.harmonicaLyricsWordsInEachLine.at(row)?.at(col)
    if(word){
      return word
    }
    return '';
  }

  getWordForInputCellIfRequiredAt(row: number, col: number):string{
    let requiredWordIndex: ICellNumber;
    let wordToAdd: string = ''
    if(row % 2 === 1 && col > 0){
      requiredWordIndex = this.findInverseActualRowInVIew(row, col);
      wordToAdd = this.getWordAt(requiredWordIndex.row, requiredWordIndex.col);
    }
    return wordToAdd;
  }
  disable(row: number): boolean {
    return row % 2 === 1;
  }

  private findActualRowAndColInTableInView(row: number, col: number): ICellNumber{
    let actualRow: number;
    let actualCol: number;
    actualRow = ((row + 1) * 2) - 1;
    actualCol = col + 1;
    return {
      row: actualRow,
      col: actualCol
    }
  }

  private findInverseActualRowInVIew(row: number, col: number): ICellNumber{
    let inverseRow: number;
    let inverseCol: number;
    inverseRow = ((row + 1)/2)-1;
    inverseCol = col - 1;
    return{
      row:inverseRow,
      col:inverseCol
    }
  }
}
