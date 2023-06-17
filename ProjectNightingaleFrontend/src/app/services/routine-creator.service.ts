import { Injectable } from '@angular/core';
import {TopicCreatorComponent} from "../routines/routine-detail/topics/topic-creator/topic-creator.component";
import {Topic} from "../models/topic-model/topic";
import {Routine} from "../models/routine-model/routine";

@Injectable({
  providedIn: 'root'
})
export class RoutineCreatorService {

  topicsCreated: Topic[];
  routineCreated: Routine;
  constructor() {
    this.routineCreated = new Routine('');
    this.topicsCreated = [];
  }
}
