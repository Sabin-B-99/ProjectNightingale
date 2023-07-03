import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
  private selectedChordChangesSubscription: Subscription;

  constructor(private chordService: ChordService) {
  }

  ngOnDestroy(): void {
    this.selectedChordChangesSubscription.unsubscribe();
    this.chordService.resetSelectedChords();
  }

  ngOnInit(): void {
    this.selectedChordChangesSubscription =  this.chordService.selectedChordChangesChanged
      .subscribe( (selectedChords: Chord[])=>{
        this.selectedChords = selectedChords;
      } );
  }

  onCloseClicked() {
    this.close.emit();
  }
}
