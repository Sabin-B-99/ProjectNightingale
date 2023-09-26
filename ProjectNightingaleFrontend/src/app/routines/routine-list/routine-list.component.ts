import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, Subscription, switchMap} from "rxjs";
import {RoutineCreatorService} from "../../services/routine-creator.service";

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit,  OnDestroy{


  public routines: Routine[];
  private routinesListSubscription: Subscription;
  private deleteRoutineSubscription: Subscription;
  private routineListReloadSubscription: Subscription;


  disableAllDeleteButtonAfterClicked: boolean = false;

  constructor(private routineService: RoutineService,
              private routineCreatorService: RoutineCreatorService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit(): void {
    this.loadUserRoutines();
    this.reloadUserRoutinesIfNecessary()
  }

  private loadUserRoutines(){
    this.routinesListSubscription = this.routineService.loadUserRoutines()
      .subscribe( (loadedRoutines: Routine[]) =>{
        this.routines = loadedRoutines;
      });
  }

  private reloadUserRoutinesIfNecessary(){
    this.routineListReloadSubscription = this.routineService.routineSaved
      .subscribe(saveStatus => {
        if(saveStatus){
          this.loadUserRoutines();
        }
      })
  }
  ngOnDestroy() {
    if(this.deleteRoutineSubscription){
      this.deleteRoutineSubscription.unsubscribe();
    }
    if(this.routinesListSubscription){
      this.routinesListSubscription.unsubscribe();
    }
    if(this.routineListReloadSubscription){
      this.routineListReloadSubscription.unsubscribe();
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
    this.disableAllDeleteButtonAfterClicked = true;
    this.deleteRoutineSubscription =  this.routineService.deleteRoutineById(routine.routineId)
      .pipe(switchMap( () => {
          return this.routineService.loadUserRoutines();
      })).subscribe((loadedRoutines: Routine[]) => {
        this.routines = loadedRoutines;
        this.disableAllDeleteButtonAfterClicked = false;
      });
  }
}
