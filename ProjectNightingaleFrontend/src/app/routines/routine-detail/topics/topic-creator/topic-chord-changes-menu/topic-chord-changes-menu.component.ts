import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../../models/chord-model/chord";
import {ChordChange} from "../../../../../models/chord-change-model/chord-change";
import {ChordChangesService} from "../../../../../services/chord-changes.service";
import {Subscription} from "rxjs";
import {SelectedChordsService} from "../../../../../services/selected-chords.service";

@Component({
  selector: 'app-topic-chord-changes-menu',
  templateUrl: './topic-chord-changes-menu.component.html',
  styleUrls: ['./topic-chord-changes-menu.component.css']
})
export class TopicChordChangesMenuComponent  implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  save: EventEmitter<ChordChange[]> = new EventEmitter<ChordChange[]>();

  selectedChordsChangedSubscription: Subscription;

  chordChanges: ChordChange[] = [];
  chordChangesSubscription: Subscription;

  latestSelectedChord: Chord;


  disableFromChords: boolean = false;
  disableToChords: boolean = true;


  constructor(private chordChangesService: ChordChangesService,
              private selectedChordService: SelectedChordsService) {
  }

  ngOnDestroy(): void {
    this.chordChangesSubscription.unsubscribe();
    this.selectedChordsChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.chordChangesSubscription = this.chordChangesService.chordChangesChanged
      .subscribe(
        (chordChanges: ChordChange[]) =>{
          this.chordChanges = chordChanges;
        }
      )

    this.selectedChordsChangedSubscription = this.selectedChordService.selectedChordsChanged
      .subscribe(
        (chords: Chord[]) =>{

          switch (chords.length){
            case 1:
              this.disableFromChords = true;
              this.disableToChords = false;
              break;
            case 2:
              this.disableFromChords = false;
              this.disableToChords = true;
              const chordFrom: Chord | undefined = chords.at(0);
              const chordTo: Chord | undefined = chords.at(1);
              if(chordFrom && chordTo){
                const chordChange: ChordChange =  new ChordChange(chordFrom,chordTo)
                this.chordChangesService.addChanges(chordChange);
              }
              this.selectedChordService.clearSelectedChords();
          }
        }
      )
  }

  onCloseClicked(){
    this.close.emit();
  }

  setLatestChordSelected($event: Chord) {
    this.latestSelectedChord = $event;
  }

  removeSelectedChordChange(chordChange: ChordChange) {
    const removalIndex: number = this.chordChanges.indexOf(chordChange);
    this.chordChangesService.removedChordChangeAtIndex(removalIndex);
  }

  onSaveClicked() {
    this.save.emit(this.chordChanges.slice());
  }

  setChordChangesForEdit(chordChanges: ChordChange[]) {
    this.chordChanges = chordChanges;
    this.chordChangesService.setChordChanges(chordChanges);
  }
}
