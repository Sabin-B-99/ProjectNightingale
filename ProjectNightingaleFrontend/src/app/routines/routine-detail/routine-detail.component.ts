import {Component, Input, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.css']
})
export class RoutineDetailComponent implements OnInit{
  selectedRoutine: Routine;

  constructor(private route: ActivatedRoute,
              private routineService: RoutineService) {
  }
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (param: Params) =>{
          this.selectedRoutine = this.routineService.getRoutineByID(+param['id']);
        }
      )
  }
}
