import { Injectable } from '@angular/core';
import {Routine} from "../models/routine-model/routine";
import {TopicCreatorService} from "./topic-creator.service";

@Injectable({
  providedIn: 'root'
})
export class RoutineCreatorService {

  routineCreated: Routine;
  constructor(public topicCreatorService: TopicCreatorService) {
  }
}
