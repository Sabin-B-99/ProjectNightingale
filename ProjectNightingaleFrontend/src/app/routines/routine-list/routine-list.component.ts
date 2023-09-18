import {Component, OnDestroy, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {RoutineCreatorService} from "../../services/routine-creator.service";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit, OnDestroy{


  public routines: Routine[];
  private routinesListSubscription: Subscription;
  private deleteRoutineSubscription: Subscription;

  constructor(private routineService: RoutineService,
              private routineCreatorService: RoutineCreatorService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
   this.routinesListSubscription = this.routineService.loadUserRoutines()
      .subscribe( (loadedRoutines: Routine[]) =>{
        this.routines = loadedRoutines;
      });
  }
  ngOnDestroy() {
    if(this.deleteRoutineSubscription){
      this.deleteRoutineSubscription.unsubscribe();
    }
    if(this.routinesListSubscription){
      this.routinesListSubscription.unsubscribe();
    }
  }

  onRoutineSelected(selectedRoutine: Routine):void {
    this.routineService.setSelectedRoutine(selectedRoutine);
    this.router.navigate([selectedRoutine.routineId, 'topics'], {relativeTo: this.route});
  }

  onAddRoutineButtonClicked(): void{
    this.routineCreatorService.setEditMode(false);
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onEditRoutineClicked(routine: Routine) {
    this.routineCreatorService.setEditMode(true);
    this.routineCreatorService.setRoutineIdForEdit(routine.routineId);
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onRoutineDeleteClicked(routine: Routine) {
    this.deleteRoutineSubscription =  this.routineService.deleteRoutineById(routine.routineId)
      .subscribe((deleteProcessComplete: boolean) =>{

      });
  }
}
