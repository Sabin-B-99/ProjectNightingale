import {EventEmitter, Injectable} from '@angular/core';
import {Chord} from "../models/chord-model/chord";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabCreatorService {

  selectedChordsForTabs: Chord[] = [];
  selectedChordsChangedEvenEmitter: Subject<Chord[]> = new Subject<Chord[]>();
  constructor() { }

  setSelectedChords(selectedChords: Chord[]){
    this.selectedChordsForTabs = selectedChords;
    this.selectedChordsChangedEvenEmitter.next(this.selectedChordsForTabs.slice());
    this.selectedChordsForTabs.splice(0, this.selectedChordsForTabs.length);
  }
}
