import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, Subscription, switchMap} from "rxjs";
import {RoutineService} from "../services/routine.service";
import {IRoutine} from "../types/custom-interfaces";
import {Routine} from "../models/routine-model/routine";

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent implements OnInit{

  selectedRoutineSubscription: Subscription;
  loadedRoutine: IRoutine;

  constructor(private routineService: RoutineService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedRoutineSubscription = this.route.params
      .pipe(switchMap(param => this.routineService.loadRoutineAndItsTopicContentsByRoutineId(+param['id'])))
      .subscribe(routine => this.loadedRoutine = routine);
  }

}
