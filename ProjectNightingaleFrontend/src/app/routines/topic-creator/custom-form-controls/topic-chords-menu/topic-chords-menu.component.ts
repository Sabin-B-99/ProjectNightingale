import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../models/chord-model/chord";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-topic-chords-menu',
  templateUrl: './topic-chords-menu.component.html',
  styleUrls: ['./topic-chords-menu.component.css'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TopicChordsMenuComponent
    }
  ]
})
export class TopicChordsMenuComponent implements ControlValueAccessor, OnInit{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  save: EventEmitter<Chord[]> = new EventEmitter<Chord[]>();

  latestChordSelected: Chord | undefined;

  selectedChords: Chord[] = [];

  @Input()
  selectedChordsForEdit: Chord[];

  onChange: (selectedChords: Chord[]) => void = (selectedChords: Chord[]): void => {};
  onTouched: () => void = ():void =>{};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor() {
  }

  ngOnInit():void {
    if(this.selectedChordsForEdit){
      this.selectedChords.push(...this.selectedChordsForEdit);
      this.onChange(this.selectedChords);
    }
  }

  addChord(selectedChord: Chord):void{
    this.markAsTouched();
    if(!this.isDisabled){
      this.selectedChords.push(selectedChord);
      this.onChange(this.selectedChords);
      this.setLatestChordSelected(selectedChord);
    }
  }

  removeSelectedChord(indexToRemove: number) {
    this.markAsTouched();
    if(!this.isDisabled){
      this.selectedChords.splice(indexToRemove, 1);
      this.onChange(this.selectedChords);
    }
  }

  setLatestChordSelected(chord: Chord | undefined) {
    this.latestChordSelected = chord;
  }

  onCloseClicked() {
    this.close.emit();
  }

  onSaveClicked() {
    this.save.emit(this.selectedChords.slice());
  }


  writeValue(selectedChords: Chord[]): void {
    this.selectedChords = selectedChords;
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
}
