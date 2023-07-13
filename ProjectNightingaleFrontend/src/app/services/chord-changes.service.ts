import { Injectable } from '@angular/core';
import {ChordChange} from "../models/chord-change/chord-change";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChordChangesService {

  private chordChanges: ChordChange[] = [];
  chordChangesChanged: Subject<ChordChange[]> = new Subject<ChordChange[]>();
  constructor() { }


  getChordChanges(): ChordChange[]{
    return this.chordChanges.slice();
  }
  addChanges(chordChange: ChordChange){
    this.chordChanges.push(chordChange);
    this.chordChangesChanged.next(this.chordChanges.slice());
  }

  removedChordChangeAtIndex(removalIndex: number) {
    this.chordChanges.splice(removalIndex, 1);
    this.chordChangesChanged.next(this.chordChanges.slice());
  }
}
