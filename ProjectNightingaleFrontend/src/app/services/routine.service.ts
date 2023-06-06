import {EventEmitter, Injectable} from '@angular/core';
import {Routine} from "../models/routine-model/routine";
import {Topic} from "../models/topic-model/topic";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private routines: Routine[] = [
    new Routine("Can't help falling in love with you. Chord Progressions",
      [
        new Topic('A->B'),
        new Topic('B->C')
      ]),
    new Routine("Sitting in the dock of the bay. Strum Patterns",
      [
        new  Topic(' UDDU DU'),
        new Topic('DXU DXUU DU')
      ]),
    new Routine("About You. Chord Perfect",
      [
        new Topic('A'),
        new Topic('B')
      ])
  ];
  constructor() { }

  public getRoutines(){
    return this.routines.slice();
  }

  getRoutineByID(id: number): Routine {
    return this.routines[id];
  }
}
