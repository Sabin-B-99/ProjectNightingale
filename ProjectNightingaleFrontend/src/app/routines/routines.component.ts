import {Component, OnInit} from '@angular/core';
import {Routine} from "../models/routine-model/routine";
import {RoutineService} from "../services/routine.service";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css'],
  providers: [RoutineService]
})
export class RoutinesComponent implements OnInit{

  selectedRoutine:Routine;
  routineBeingCreated: boolean = false;

  constructor(private routineService: RoutineService) {
  }


  displayRoutineCreator(routineBeingCreated: boolean) {
    this.routineBeingCreated = routineBeingCreated;
  }

  ngOnInit(): void {
    this.routineService.routineSelected
      .subscribe(
        (routine: Routine) =>{
          this.selectedRoutine = routine;
        }
      )
  }
}
