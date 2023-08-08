import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chord} from "../../models/chord-model/chord";

@Component({
  selector: 'app-chord-item',
  templateUrl: './chord-item.component.html',
  styleUrls: ['./chord-item.component.css']
})
export class ChordItemComponent implements OnInit, OnDestroy{

  @Input()
  selectedChord: Chord | undefined;

  @Input()
  imageWidth: number = 100;

  @Input()
  imageHeight: number = 100;

  constructor() {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
