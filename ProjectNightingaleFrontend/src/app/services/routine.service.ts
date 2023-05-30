import {EventEmitter, Injectable} from '@angular/core';
import {Routine} from "../models/routine-model/routine";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  routineSelected: EventEmitter<Routine> = new EventEmitter<Routine>();

  private routines: Routine[] = [
    new Routine("Can't help falling in love with you. Chord Progressions"),
    new Routine("Sitting in the dock of the bay. Strum Patterns"),
    new Routine("About You. Chord Perfect")
  ];
  constructor() { }

  public getRoutines(){
    return this.routines.slice();
  }
}
