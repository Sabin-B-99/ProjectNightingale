import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit{


  public routines: Routine[];
  constructor(private routineService: RoutineService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    this.routines = this.routineService.getRoutines();
  }

  onRoutineSelected(id: number):void {
    this.router.navigate([id, 'topics'], {relativeTo: this.route});
  }

  onAddRoutineButtonClicked(): void{
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
