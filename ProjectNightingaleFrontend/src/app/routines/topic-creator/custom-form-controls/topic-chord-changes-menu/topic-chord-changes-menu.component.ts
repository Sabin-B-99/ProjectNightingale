import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../models/chord-model/chord";
import {ChordChange} from "../../../../models/chord-change-model/chord-change";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IChordChanges} from "../../../../types/song-interfaces";

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
  selectedChordChangesOrderKeyValues: IChordChanges[] = [];

  @Input()
  chordChangesForEdit: ChordChange[];

  latestSelectedChord: Chord;
  chordsSelectedForAChange: Chord[] = [];
  disableFromChords: boolean = false;
  disableToChords: boolean = true;


  onChange: (selectedChangesOrderKeyValues: IChordChanges[]) => void
    = (selectedChangesOrderKeyValues: IChordChanges[]):void =>{};
  onTouched: () => void = ():void => {};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    if(this.chordChangesForEdit){
      this.chordChanges.push(...this.chordChangesForEdit);
      this.onChange(this.buildSelectedChordChangesOrderAndKeyValuesForEdit(this.chordChanges));
    }
  }

  buildSelectedChordChangesOrderAndKeyValuesForEdit(selectedChordChangesForEdit: ChordChange[]): IChordChanges[]{
    let selectedChordChangesOrderAndKeyForEdit: IChordChanges[] = [];
    for (let chordChange of selectedChordChangesForEdit){
      selectedChordChangesOrderAndKeyForEdit.push(
        {
          changeFrom: {
            chordRootOrder: chordChange.getFromChord().chordRoot.rootOrder,
            chordKeyId: chordChange.getFromChord().chordKey.id,
            chordRootName: chordChange.getChordFromRootName(),
            chordKeyName: chordChange.getChordFromKeyName()
          },

          changeTo: {
            chordRootOrder: chordChange.getToChord().chordRoot.rootOrder,
            chordKeyId: chordChange.getToChord().chordKey.id,
            chordRootName: chordChange.getChordToRootName(),
            chordKeyName: chordChange.getChordToKeyName()
          }
        }
      )
    }
    return selectedChordChangesOrderAndKeyForEdit;
  }

  addChordChange(chordToAddToAChange: Chord){
    const chordChange: ChordChange | null = this.validateAddedChordChange(chordToAddToAChange);
    this.markAsTouched();
    if(chordChange && !this.isDisabled){
      let chordChangeOrderAndKeyValues: IChordChanges = {
        changeFrom: {
          chordRootOrder: chordChange.getFromChord().chordRoot.rootOrder,
          chordKeyId: chordChange.getFromChord().chordKey.id,
          chordRootName: chordChange.getChordFromRootName(),
          chordKeyName: chordChange.getChordFromKeyName()
        },

        changeTo: {
          chordRootOrder: chordChange.getToChord().chordRoot.rootOrder,
          chordKeyId: chordChange.getToChord().chordKey.id,
          chordRootName: chordChange.getChordToRootName(),
          chordKeyName: chordChange.getChordToKeyName()
        }
      };
      this.chordChanges.push(chordChange);
      this.selectedChordChangesOrderKeyValues.push(chordChangeOrderAndKeyValues);
      this.onChange(this.selectedChordChangesOrderKeyValues);
    }
  }

  removeSelectedChordChange(indexToRemove: number) {
    this.markAsTouched();
    if(!this.isDisabled){
      this.selectedChordChangesOrderKeyValues.splice(indexToRemove, 1);
      this.chordChanges.splice(indexToRemove, 1);
      this.onChange(this.selectedChordChangesOrderKeyValues);
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


  writeValue(selectedChangesOrderKeyValues: IChordChanges[]): void {
    this.selectedChordChangesOrderKeyValues = selectedChangesOrderKeyValues;
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
