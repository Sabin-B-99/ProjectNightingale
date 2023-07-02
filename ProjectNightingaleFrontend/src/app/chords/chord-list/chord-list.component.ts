import {Component, Directive, ElementRef, HostListener} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {ChordRoot} from "../../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../../models/chord-model/chord-key-model/chord-key";

@Component({
  selector: 'app-chord-list',
  templateUrl: './chord-list.component.html',
  styleUrls: ['./chord-list.component.css']
})
export class ChordListComponent {

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
    this.chordService.selectedChordKey = chordKey;
    this.chordService.setSelectedChord();
  }

  setSelectedChordRootNote(chordRootNote: ChordRoot) {
    this.selectedRootNoteIndex = this.chordRootNotes.indexOf(chordRootNote);
    this.chordService.selectedRootNote = chordRootNote;
    this.chordService.setSelectedChord();
  }
}
