import { Injectable } from '@angular/core';
import {Chord} from "../models/chord-model/chord";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedChordsService {

  private selectedChords: Chord[] = [];

  selectedChordsChanged: Subject<Chord[]> = new Subject<Chord[]>();
  constructor() { }

  setSelectedChords(chords: Chord[]){
    this.selectedChords = chords;
  }
  addChord(addedChord: Chord){
    this.selectedChords.push(addedChord);
    this.selectedChordsChanged.next(this.selectedChords.slice());
  }

  removeSelectedChordAt(index: number){
    this.selectedChords.splice(index,1);
    this.selectedChordsChanged.next(this.selectedChords.slice());
  }

  clearSelectedChords() {
    this.selectedChords.splice(0, this.selectedChords.length);
  }
}
