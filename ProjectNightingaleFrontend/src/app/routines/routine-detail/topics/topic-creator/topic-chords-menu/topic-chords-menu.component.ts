import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../../models/chord-model/chord";
import {Subscription} from "rxjs";
import {SelectedChordsService} from "../../../../../services/selected-chords.service";

@Component({
  selector: 'app-topic-chords-menu',
  templateUrl: './topic-chords-menu.component.html',
  styleUrls: ['./topic-chords-menu.component.css']
})
export class TopicChordsMenuComponent implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  save: EventEmitter<Chord[]> = new EventEmitter<Chord[]>();

  selectedChords: Chord[];
  latestChordSelected: Chord | undefined;

  private selectedChordsChangedSubs: Subscription;

  constructor(private selectedChordsService: SelectedChordsService) {
  }

  ngOnDestroy(): void {
    this.selectedChordsChangedSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.selectedChordsChangedSubs = this.selectedChordsService.selectedChordsChanged
      .subscribe( (chords: Chord[]): void =>{
        this.selectedChords = chords;
      })
  }

  onCloseClicked() {
    this.close.emit();
  }

  setLatestChordSelected(chord: Chord | undefined) {
    this.latestChordSelected = chord;
  }

  removeSelectedChord(selectedChord: Chord) {
    const indexToRemove: number =  this.selectedChords.indexOf(selectedChord);
    this.selectedChordsService.removeSelectedChordAt(indexToRemove);
  }

  onSaveClicked() {
    this.save.emit(this.selectedChords.slice());
  }

  setSelectedChordsForEdit(chords: Chord[]) {
    this.selectedChords = chords;
    this.selectedChordsService.setSelectedChords(chords);
  }
}
