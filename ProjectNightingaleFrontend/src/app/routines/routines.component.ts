import { Component } from '@angular/core';
import {Routine} from "./routine-list/routine-item/routine";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent {

  selectedRoutine:Routine;
  routineBeingCreated: boolean = false;
  assignSelectedRoutine($event: Routine) {
    this.selectedRoutine = $event;
  }

  displayRoutineCreator(routineBeingCreated: boolean) {
    this.routineBeingCreated = routineBeingCreated;
  }
}
