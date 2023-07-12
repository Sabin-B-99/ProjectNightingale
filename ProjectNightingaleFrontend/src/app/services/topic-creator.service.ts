import { Injectable } from '@angular/core';
import {Topic} from "../models/topic-model/topic";

@Injectable({
  providedIn: 'root'
})
export class TopicCreatorService {

  private topics: Topic[] = [];
  constructor() { }

  getTopics(){
    return this.topics.slice();
  }

  addTopic(topic: Topic){
    this.topics.push(topic);
  }
}
