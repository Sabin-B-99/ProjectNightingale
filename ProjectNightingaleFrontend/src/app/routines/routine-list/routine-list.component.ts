import {Component, OnDestroy, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";
import {RoutineService} from "../../services/routine.service";
import {ActivatedRoute,  Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {RoutineCreatorService} from "../../services/routine-creator.service";
import {AuthenticationService} from "../../services/authentication.service";

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

  username: string | null;


  disableAllDeleteButtonAfterClicked: boolean = false;

  constructor(private routineService: RoutineService,
              private routineCreatorService: RoutineCreatorService,
              private route: ActivatedRoute,
              private router: Router, private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.username = this.authService.getAuthenticatedUserInfo().username;
    if(this.username){
      this.loadUserRoutines(this.username);
      this.reloadUserRoutinesIfNecessary(this.username)
    }
  }

  private loadUserRoutines(username: string){
    this.routinesListSubscription = this.routineService.loadUserRoutines(username)
      .subscribe( (loadedRoutines: Routine[]) =>{
        this.routines = loadedRoutines;
      });
  }

  private reloadUserRoutinesIfNecessary(username: string){
    this.routineListReloadSubscription = this.routineService.routineSaved
      .subscribe(saveStatus => {
        if(saveStatus){
          this.loadUserRoutines(username);
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

  onRoutineDeleteClicked(routine: Routine, username: string|null) {
    if(username){
      this.disableAllDeleteButtonAfterClicked = true;
      this.deleteRoutineSubscription =  this.routineService.deleteRoutineById(routine.routineId)
        .pipe(switchMap( () => {
          return this.routineService.loadUserRoutines(username);
        })).subscribe((loadedRoutines: Routine[]) => {
          this.routines = loadedRoutines;
          this.disableAllDeleteButtonAfterClicked = false;
        });
    }
  }

  onStartClicked(routineId: number) {
    this.router.navigate(['../practise', routineId]);
  }
}
