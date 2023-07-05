import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ChordService} from "../../../../../services/chord.service";
import {Chord} from "../../../../../models/chord-model/chord";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topic-chords-menu',
  templateUrl: './topic-chords-menu.component.html',
  styleUrls: ['./topic-chords-menu.component.css']
})
export class TopicChordsMenuComponent implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  selectedChords: Chord[];
  latestChordSelected: Chord | undefined;

  constructor() {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onCloseClicked() {
    this.close.emit();
  }
  setSelectedChords($event: Chord[]) {
    this.selectedChords = $event;
    const latestChordSelected: Chord | undefined = this.selectedChords.at(this.selectedChords.length - 1);
    if(latestChordSelected){
      this.setLatestChordSelected(latestChordSelected);
    }
  }

  setLatestChordSelected(chord: Chord | undefined) {
    this.latestChordSelected = chord;
  }
}
