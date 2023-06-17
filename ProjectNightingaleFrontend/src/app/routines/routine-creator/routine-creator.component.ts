import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {TopicCreatorComponent} from "../routine-detail/topics/topic-creator/topic-creator.component";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit{

  routineCreationForm: FormGroup;

  onRoutineSubmitted() {
    console.log(this.routineCreationForm.value);
  }


  onAddTopicClicked(){
    this.topicFormArray?.push(TopicCreatorComponent.addTopicForm());
  }

  ngOnInit(): void {
     this.routineCreationForm = new FormGroup({
       'titleInput': new FormControl(null),
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
