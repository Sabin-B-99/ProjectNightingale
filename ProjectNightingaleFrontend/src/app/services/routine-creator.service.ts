import { Injectable } from '@angular/core';
import {Routine} from "../models/routine-model/routine";

@Injectable({
  providedIn: 'root'
})
export class RoutineCreatorService {

  routineCreated: Routine;
  constructor() {
  }
}
