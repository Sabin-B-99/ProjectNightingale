import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Routine} from "./routine-item/routine";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css']
})
export class RoutineListComponent implements OnInit{

  @Output()
  selectedRoutineEmitter: EventEmitter<Routine> = new EventEmitter<Routine>();

  @Output()
  routineAddBtnClickEmitter: EventEmitter<void> = new EventEmitter<void>();

  public routines: Routine[] = [
    new Routine("Can't help falling in love with you. Chord Progressions"),
    new Routine("Sitting in the dock of the bay. Strum Patterns"),
    new Routine("About You. Chord Perfect")
  ];
  constructor() {
  }
  ngOnInit(): void {
  }

  onRoutineSelected(routine: Routine) {
    this.selectedRoutineEmitter.emit(routine);
  }

  onRoutineAddBtnClicked() {
    this.routineAddBtnClickEmitter.emit();
  }
}
