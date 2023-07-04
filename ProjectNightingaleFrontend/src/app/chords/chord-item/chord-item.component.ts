import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {Subscription} from "rxjs";
import {Chord} from "../../models/chord-model/chord";

@Component({
  selector: 'app-chord-item',
  templateUrl: './chord-item.component.html',
  styleUrls: ['./chord-item.component.css']
})
export class ChordItemComponent implements OnInit, OnDestroy{

  @Input()
  selectedChord: Chord;

  constructor() {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
