import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicCreatorComponent} from "../topic-creator/topic-creator.component";
import {RoutineCreatorService} from "../../services/routine-creator.service";
import {Routine} from "../../models/routine-model/routine";
import {Topic} from "../../models/topic-model/topic";
import {Router} from "@angular/router";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit, AfterViewChecked{

  @ViewChild('scrollTopicFormToBottom') topicFormScroller: ElementRef;

  routineCreationForm: FormGroup;

  constructor(private routineCreatorService: RoutineCreatorService, private router: Router) {
  }

  ngOnInit(): void {
    this.routineCreationForm = new FormGroup({
      'routineTitle': new FormControl(null, [Validators.required]),
      'topics': new FormArray([
        TopicCreatorComponent.addTopicForm()
      ])
    });
  }
  ngAfterViewChecked() {
    this.scrollTopicFormToBottom();
  }

  scrollTopicFormToBottom(){
    try {
      this.topicFormScroller.nativeElement.scrollTop = this.topicFormScroller.nativeElement.scrollHeight;
    }catch (err){
    }
  }

  onRoutineSubmitted() {
     const routineTopics: Topic[] = this.routineCreationForm.value.topics;
     const routineTitle: string = this.routineCreationForm.value.routineTitle;
     //TODO: CHANGE THE HARDCODED id and duration Later 1 and -1 in line below.
     this.routineCreatorService.routineCreated = new Routine(1, routineTitle, -1, routineTopics);
     console.log(this.routineCreationForm.value);
     this.router.navigate(['/routines']);
  }


  onAddTopicClicked(){
    this.topicFormArray?.push(TopicCreatorComponent.addTopicForm());
  }

  get topicFormArray(): FormArray<FormGroup>{
    return (<FormArray<FormGroup>>this.routineCreationForm?.get('topics'));
  }

  deleteTopic(topicIndex: number){
    this.topicFormArray?.removeAt(topicIndex);
  }
}
