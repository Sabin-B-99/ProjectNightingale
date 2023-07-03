import {Component, Directive, ElementRef, HostListener, OnDestroy} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {ChordRoot} from "../../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../../models/chord-model/chord-key-model/chord-key";
import {Chord} from "../../models/chord-model/chord";

@Component({
  selector: 'app-chord-list',
  templateUrl: './chord-list.component.html',
  styleUrls: ['./chord-list.component.css']
})
export class ChordListComponent{

  selectedChordRoot: ChordRoot | null;
  selectedChordKey: ChordKey | null;

  selectedRootNoteIndex: number = -1;
  selectedKeyNoteIndex: number = -1;

  chordRootNotes: ChordRoot[];
  chordKeys: ChordKey[];
  constructor(private chordService: ChordService) {
    this.chordRootNotes = this.chordService.getRootNotes();
    this.chordKeys = this.chordService.getKeys();
  }

  setSelectedChordKey(chordKey: ChordKey) {
    this.selectedKeyNoteIndex = this.chordKeys.indexOf(chordKey);
    this.selectedChordKey = chordKey;
    this.checkRootAndKeyAndSetSelectedChord();
  }

  setSelectedChordRootNote(chordRootNote: ChordRoot) {
    this.selectedRootNoteIndex = this.chordRootNotes.indexOf(chordRootNote);
    this.selectedChordRoot = chordRootNote;
    this.checkRootAndKeyAndSetSelectedChord();
  }

  private checkRootAndKeyAndSetSelectedChord() {
    if(this.selectedChordRoot && this.selectedChordKey){
      let chordSuccessfullySet: boolean =
        this.chordService.setSelectedChord(new Chord(this.selectedChordRoot, this.selectedChordKey));
      if(chordSuccessfullySet){
        this.selectedChordRoot = null;
        this.selectedChordKey = null;
        this.selectedRootNoteIndex = -1;
        this.selectedKeyNoteIndex  = -1;
      }
    }
  }
}
