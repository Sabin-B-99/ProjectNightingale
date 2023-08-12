import {Component, OnInit} from '@angular/core';
import {RoutineService} from "../services/routine.service";

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css'],
  providers: [RoutineService]
})
export class RoutinesComponent implements OnInit{

  constructor(private routineService: RoutineService) {
  }
  ngOnInit(): void {
  }
}
