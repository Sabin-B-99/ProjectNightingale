import {Component, OnInit} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {Subscription} from "rxjs";
import {Chord} from "../../models/chord-model/chord";

@Component({
  selector: 'app-chord-item',
  templateUrl: './chord-item.component.html',
  styleUrls: ['./chord-item.component.css']
})
export class ChordItemComponent implements OnInit{

  selectedChordImagePath: string;
  selectedChordSubscription: Subscription;
  constructor(private chordService: ChordService) {
  }
  ngOnInit(): void {
    this.selectedChordSubscription = this.chordService.selectedChordChanged
      .subscribe((selectedChord:Chord) =>{
        this.selectedChordImagePath = selectedChord.imagePath;
      })
  }

}