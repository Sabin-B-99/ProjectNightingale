import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Chord} from "../../../models/chord-model/chord";
import {ChordChange} from "../../../models/chord-change-model/chord-change";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-topic-chord-changes-menu',
  templateUrl: './topic-chord-changes-menu.component.html',
  styleUrls: ['./topic-chord-changes-menu.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TopicChordChangesMenuComponent
    }
  ]
})
export class TopicChordChangesMenuComponent  implements OnInit, ControlValueAccessor{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  save: EventEmitter<ChordChange[]> = new EventEmitter<ChordChange[]>();

  chordChanges: ChordChange[] = [];

  @Input()
  chordChangesForEdit: ChordChange[];

  latestSelectedChord: Chord;
  chordsSelectedForAChange: Chord[] = [];
  disableFromChords: boolean = false;
  disableToChords: boolean = true;


  onChange: (selectedChanges: ChordChange[]) => void = (selectedChanges: ChordChange[]):void =>{};
  onTouched: () => void = ():void => {};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    if(this.chordChangesForEdit){
      this.chordChanges.push(...this.chordChangesForEdit);
      this.onChange(this.chordChanges);
    }
  }

  addChordChange(chordToAddToAChange: Chord){
    const chordChange: ChordChange | null = this.validateAddedChordChange(chordToAddToAChange);
    this.markAsTouched();
    if(chordChange && !this.isDisabled){
      this.chordChanges.push(chordChange);
      this.onChange(this.chordChanges);
    }
  }

  removeSelectedChordChange(indexToRemove: number) {
    this.markAsTouched();
    if(!this.isDisabled){
      this.chordChanges.splice(indexToRemove, 1);
      this.onChange(this.chordChanges);
    }
  }

  setLatestChordSelected(selectedChord: Chord) {
    this.latestSelectedChord = selectedChord;
  }

  validateAddedChordChange(chordToAddToAChange: Chord): ChordChange | null{
    this.chordsSelectedForAChange.push(chordToAddToAChange);
    this.setLatestChordSelected(chordToAddToAChange);
    switch (this.chordsSelectedForAChange.length){
      case 1:
        this.disableFromChords = true;
        this.disableToChords = false;
        break;
      case 2:
        this.disableFromChords = false;
        this.disableToChords = true;
        const chordFrom: Chord | undefined = this.chordsSelectedForAChange.at(0);
        const chordTo: Chord | undefined = this.chordsSelectedForAChange.at(1);
        if(chordFrom && chordTo) {
          this.chordsSelectedForAChange.splice(0, this.chordsSelectedForAChange.length);
          return new ChordChange(chordFrom, chordTo)
        }
        break;
    }
    return null;
  }

  onCloseClicked(){
    this.close.emit();
  }

  onSaveClicked() {
    this.save.emit(this.chordChanges.slice());
  }


  writeValue(selectedChanges: ChordChange[]): void {
    this.chordChanges = selectedChanges;
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
