import { Component } from '@angular/core';
import {Chord} from "../models/chord-model/chord";

@Component({
  selector: 'app-chords',
  templateUrl: './chords.component.html',
  styleUrls: ['./chords.component.css']
})
export class ChordsComponent {
  selectedChord: Chord;
  setSelectedChord($event: Chord) {
    this.selectedChord = $event;
  }
}
