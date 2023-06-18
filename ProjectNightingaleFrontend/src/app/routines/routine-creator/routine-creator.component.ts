import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {TopicCreatorComponent} from "../routine-detail/topics/topic-creator/topic-creator.component";
import {RoutineCreatorService} from "../../services/routine-creator.service";
import {Routine} from "../../models/routine-model/routine";
import {Topic} from "../../models/topic-model/topic";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit{

  routineCreationForm: FormGroup;

  constructor(private routineCreatorService: RoutineCreatorService) {
  }

  onRoutineSubmitted() {
     const routineTopics: Topic[] = this.routineCreationForm.value.topics;
     const routineTitle: string = this.routineCreationForm.value.routineTitle;
     this.routineCreatorService.routineCreated = new Routine(routineTitle, routineTopics)
  }


  onAddTopicClicked(){
    this.topicFormArray?.push(TopicCreatorComponent.addTopicForm());
  }

  ngOnInit(): void {
     this.routineCreationForm = new FormGroup({
       'routineTitle': new FormControl(null),
       'topics': new FormArray([
         TopicCreatorComponent.addTopicForm()
       ])
     });
  }

  get topicFormArray(): FormArray<FormGroup>{
    return (<FormArray<FormGroup>>this.routineCreationForm?.get('topics'));
  }

  deleteTopic(topicIndex: number){
    this.topicFormArray?.removeAt(topicIndex);
  }
}
