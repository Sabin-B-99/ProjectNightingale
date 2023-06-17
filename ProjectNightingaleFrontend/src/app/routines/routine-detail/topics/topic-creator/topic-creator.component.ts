import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {map, Observable, Subject, Subscription} from "rxjs";
import {RoutineCreatorService} from "../../../../services/routine-creator.service";
import {Topic} from "../../../../models/topic-model/topic";
import {Routine} from "../../../../models/routine-model/routine";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent{


  @Input()
  topicForm: FormGroup;

  @Input()
  indexInCurrentRoutine: number;

  @Input()
  totalTopics: number;


  @Output()
  deleteTopicEvent: EventEmitter<number> = new EventEmitter<number>();
  constructor(private routineCreatorService: RoutineCreatorService) {
  }

  static addTopicForm(): FormGroup{
    return new FormGroup({
      'topicTitleInput': new FormControl(null),
      'topicSongInput': new FormControl(null),
      'topicStrumPatternInput': new FormControl(null),
      'topicTimeInput': new FormControl(null)
    })
  }

  deleteTopic(topicIndex: number){
    this.deleteTopicEvent.emit(topicIndex);
  }
}
