import {Component, OnInit} from '@angular/core';
import {Routine} from "./routine-item/routine";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit{
  public routines: Routine[] = [
    new Routine("Can't help falling in love with you. Chord Progressions"),
    new Routine("Sitting in the dock of the bay. Strum Patterns"),
    new Routine("About You. Chord Perfect")
  ];
  constructor() {
  }
  ngOnInit(): void {
  }
}
