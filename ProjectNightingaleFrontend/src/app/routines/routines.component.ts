import {Component, OnInit} from '@angular/core';
import {Routine} from "./routine";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit{
  public routines: Routine[] = [
    new Routine("Can't help falling in love with you"),
    new Routine("Sitting in the dock of the bay"),
    new Routine("About You")
  ];
  constructor() {
  }
  ngOnInit(): void {
  }
}
