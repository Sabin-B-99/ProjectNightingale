import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit{


  @Output()
  routineAddBtnClickEmitter: EventEmitter<void> = new EventEmitter<void>();

  public routines: Routine[];
  constructor(private routineService: RoutineService) {
  }
  ngOnInit(): void {
    this.routines = this.routineService.getRoutines();
  }

  onRoutineSelected(routine: Routine) {
    this.routineService.routineSelected.emit(routine);
  }

  onRoutineAddBtnClicked() {
    this.routineAddBtnClickEmitter.emit();
  }
}
