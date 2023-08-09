import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../models/chord-model/chord";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IChords} from "../../../../types/custom-interfaces";

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
  selectedChordsOrderAndKeyValues: IChords[] = [];

  @Input()
  selectedChordsForEdit: Chord[];

  onChange: (selectedChordsOrderAndKeyValues: IChords[]) => void = (selectedChordsOrderAndKeyValues: IChords[]): void => {};
  onTouched: () => void = ():void =>{};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor() {
  }

  ngOnInit():void {
    if(this.selectedChordsForEdit){
      this.selectedChords.push(...this.selectedChordsForEdit);
      this.onChange(this.buildSelectedChordsOrderAndKeysForEdit(this.selectedChords));
    }
  }

  buildSelectedChordsOrderAndKeysForEdit(selectedChordsForEdit: Chord[]): IChords[]{
    let selectedChordsOrderAndKeysValues: IChords[] = [];
    for (let chord of selectedChordsForEdit){
      selectedChordsOrderAndKeysValues.push(
        {
          root_order: chord.chordRoot.rootOrder,
          key_id: chord.chordKey.id
        }
      )
    }
    return selectedChordsOrderAndKeysValues;
  }

  addChord(selectedChord: Chord):void{
    this.markAsTouched();
    if(!this.isDisabled){
      let selectedChordOrderAndKey: IChords = {root_order: selectedChord.chordRoot.rootOrder,
        key_id: selectedChord.chordKey.id
      };
      this.selectedChordsOrderAndKeyValues.push(selectedChordOrderAndKey);
      this.selectedChords.push(selectedChord);
      this.onChange(this.selectedChordsOrderAndKeyValues);
      this.setLatestChordSelected(selectedChord);
    }
  }

  removeSelectedChord(indexToRemove: number) {
    this.markAsTouched();
    if(!this.isDisabled){
      this.selectedChordsOrderAndKeyValues.splice(indexToRemove, 1);
      this.selectedChords.splice(indexToRemove, 1);
      this.onChange(this.selectedChordsOrderAndKeyValues);
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


  writeValue(selectedChordsOrderAndKeysValues: IChords[]): void {
    this.selectedChordsOrderAndKeyValues = selectedChordsOrderAndKeysValues;
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
