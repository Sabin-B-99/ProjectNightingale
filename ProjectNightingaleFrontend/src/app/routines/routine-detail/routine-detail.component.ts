import {Component, OnDestroy, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.css']
})
export class RoutineDetailComponent implements OnInit, OnDestroy{
  selectedRoutine: Routine;
  selectedRoutineSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private routineService: RoutineService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) =>{
        this.routineService.loadRoutineById(+param['id'])
      }
    )

    this.selectedRoutineSubscription = this.routineService.selectedRoutineChanged
      .subscribe((selectedRoutine: Routine) =>{
        this.selectedRoutine = selectedRoutine;
      });
  }



  ngOnDestroy(): void {
  }
}
