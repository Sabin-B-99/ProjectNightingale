import {Component, Input, OnInit} from '@angular/core';
import {ITopic} from "../../types/custom-interfaces";
import {RoutineService} from "../../services/routine.service";
import {Chord} from "../../models/chord-model/chord";
import {ChordChange} from "../../models/chord-change-model/chord-change";

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent implements OnInit{

  @Input()
  topic: ITopic;

  topicChords: Chord[] = [];
  topicChordChanges: ChordChange[] = [];

  constructor(private routineService: RoutineService) {
  }

  ngOnInit() {
    if(this.topic){
      this.topicChords = this.routineService.buildChordsFromIChords(this.topic.chords);
      this.topicChordChanges = this.routineService.buildChordsChangesFromIChordsChanges(this.topic.topicChordChanges);
    }
  }

}
