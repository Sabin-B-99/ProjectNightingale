import {Component, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit{


  public routines: Routine[];
  private routinesListSubscription: Subscription;

  constructor(private routineService: RoutineService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
   this.routinesListSubscription = this.routineService.loadUserRoutines()
      .subscribe( (loadedRoutines: Routine[]) =>{
        this.routines = loadedRoutines;
      });
  }

  onRoutineSelected(selectedRoutine: Routine):void {
    this.routineService.setSelectedRoutine(selectedRoutine);
    this.router.navigate([selectedRoutine.routineId, 'topics'], {relativeTo: this.route});
  }

  onAddRoutineButtonClicked(): void{
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
