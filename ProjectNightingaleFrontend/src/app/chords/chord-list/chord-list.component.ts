import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {ChordRoot} from "../../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../../models/chord-model/chord-key-model/chord-key";
import {Chord} from "../../models/chord-model/chord";
import {Subscription} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-chord-list',
  templateUrl: './chord-list.component.html',
  styleUrls: ['./chord-list.component.css']
})
export class ChordListComponent implements  OnInit ,OnDestroy{

  @Input()
  disableAllChordsButton: boolean = false;

  @Output()
  selectedChordChangedEvent: EventEmitter<Chord> = new EventEmitter<Chord>();

  selectedRootNoteIndex: number = -1;
  selectedKeyNoteIndex: number = -1;
  selectedChordRoot: ChordRoot | null;
  selectedChordKey: ChordKey | null;

  chordRootNotes: ChordRoot[] = [];
  chordKeys: ChordKey[] = [];
  chordRootNotesSubscription: Subscription;
  chordKeyNoteSubscription: Subscription;
  chordImagePathSubscription: Subscription;

  constructor(private chordService: ChordService, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    this.chordRootNotesSubscription = this.chordService.getRootNotes()
      .subscribe(
      (chordRootNotes: ChordRoot[]) =>{
        this.chordRootNotes = chordRootNotes;
      }
    );

    this.chordKeyNoteSubscription = this.chordService.getKeys()
      .subscribe((chordKeys: ChordKey[]) =>{
        this.chordKeys = chordKeys;
      });
  }

  ngOnDestroy(): void {
    this.chordRootNotesSubscription.unsubscribe();
    this.chordRootNotesSubscription.unsubscribe();
    if(this.chordImagePathSubscription){
      this.chordImagePathSubscription.unsubscribe();
    }
  }
  setSelectedChordKey(chordKey: ChordKey) {
    this.selectedKeyNoteIndex = this.chordKeys.indexOf(chordKey);
    this.selectedChordKey = chordKey;
    this.loadChordImage();
  }

  setSelectedChordRootNote(chordRootNote: ChordRoot) {
    this.selectedRootNoteIndex = this.chordRootNotes.indexOf(chordRootNote);
    this.selectedChordRoot  = chordRootNote;
    this.loadChordImage()
  }

  loadChordImage(){
    if(this.selectedChordRoot && this.selectedChordKey){
      this.chordImagePathSubscription = this.chordService.loadChordImage(this.selectedChordRoot, this.selectedChordKey)
        .subscribe(
          (imageBlob: Blob) =>{
            if(this.selectedChordRoot && this.selectedChordKey){
              const selectedChord: Chord = new Chord(this.selectedChordRoot, this.selectedChordKey);

              const fileReader: FileReader = new FileReader();
              fileReader.readAsDataURL(imageBlob);
              fileReader.onload = function (){
                let imageURL:string|ArrayBuffer|null = fileReader.result;
                selectedChord.setImageUrl(imageURL);
              }

              this.selectedChordChangedEvent.emit(selectedChord);

              this.selectedRootNoteIndex = -1;
              this.selectedKeyNoteIndex= -1;
              this.selectedChordRoot = null;
              this.selectedChordKey = null;
            }
          }
        );
    }
  }
}
