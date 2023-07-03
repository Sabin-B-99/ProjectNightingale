import { Injectable } from '@angular/core';
import {ChordRoot} from "../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../models/chord-model/chord-key-model/chord-key";
import {Chord} from "../models/chord-model/chord";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChordService {
  private chordRoots: ChordRoot[] = [
    new ChordRoot("C"),
    new ChordRoot("Csharp"),
    new ChordRoot("Dflat"),
    new ChordRoot("D"),
    new ChordRoot("Dsharp"),
    new ChordRoot("Eflat"),
    new ChordRoot("E"),
    new ChordRoot("F"),
    new ChordRoot("Fsharp"),
    new ChordRoot("Gflat"),
    new ChordRoot("G"),
    new ChordRoot("Gsharp"),
    new ChordRoot("Aflat"),
    new ChordRoot("A"),
    new ChordRoot("Asharp"),
    new ChordRoot("Bflat"),
    new ChordRoot("B")
  ];

  private chordKey: ChordKey[] = [
    new ChordKey("maj"),
    new ChordKey("5"),
    new ChordKey("6"),
    new ChordKey("7"),
    new ChordKey("maj7"),
    new ChordKey("9"),
    new ChordKey("maj9"),
    new ChordKey("11"),
    new ChordKey("13"),
    new ChordKey("maj13"),
    new ChordKey("min"),
    new ChordKey("sus2"),
    new ChordKey("sus4")
  ];


  private selectedChord: Chord;
  private selectedChords: Chord[] = [];

  selectedChordChanged: Subject<Chord> = new Subject<Chord>();
  selectedChordChangesChanged: Subject<Chord[]> = new Subject<Chord[]>();
  constructor() { }

  getRootNotes(): ChordRoot[]{
    return this.chordRoots.slice();
  }

  getKeys(): ChordKey[]{
    return this.chordKey.slice();
  }

  setSelectedChord(chord: Chord): boolean{
    if(chord){
      this.selectedChord = chord;
      this.selectedChords.push(this.selectedChord);
      this.selectedChordChanged.next(this.selectedChord);
      this.selectedChordChangesChanged.next(this.selectedChords.slice());
      return true;
    }
    return false;
  }

  resetSelectedChords() {
    this.selectedChords.splice(0, this.selectedChords.length);
  }
}
