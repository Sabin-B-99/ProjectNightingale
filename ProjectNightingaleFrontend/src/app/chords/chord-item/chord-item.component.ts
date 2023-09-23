import {Component, Input, OnDestroy} from '@angular/core';
import {Chord} from "../../models/chord-model/chord";
import {Subscription} from "rxjs";
import {ChordService} from "../../services/chord.service";


@Component({
  selector: 'app-chord-item',
  templateUrl: './chord-item.component.html',
  styleUrls: ['./chord-item.component.css']
})
export class ChordItemComponent implements OnDestroy{

  _selectedChord: Chord;

  @Input()
  imageWidth: number = 100;

  @Input()
  imageHeight: number = 100;

  private chordImagePathSubscription: Subscription;

  constructor(private chordService: ChordService) {
  }
  ngOnDestroy(): void {
    if(this.chordImagePathSubscription){
      this.chordImagePathSubscription.unsubscribe();
    }
  }

  @Input() set selectedChord(selectedChord: Chord){
    this._selectedChord = selectedChord;
    this.loadChordImageIfChordIsValid();
  }

  private loadChordImageIfChordIsValid() {
    if(this._selectedChord){
      this.chordImagePathSubscription = this.chordService.loadChordImage(this._selectedChord.chordRoot, this._selectedChord.chordKey)
        .subscribe((imageBlob: Blob) => {
          const fileReader: FileReader = new FileReader();
          fileReader.readAsDataURL(imageBlob);
          fileReader.onload =  () =>{
            let imageURL:string|ArrayBuffer|null = fileReader.result;
            this._selectedChord?.setImageUrl(imageURL);
          }
        });
    }
  }
}
