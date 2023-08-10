import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicCreatorComponent} from "../topic-creator/topic-creator.component";
import {RoutineCreatorService} from "../../services/routine-creator.service";
import {Router} from "@angular/router";
import {IRoutineForm, ITopicForm} from "../../types/custom-interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit, OnDestroy ,AfterViewChecked{

  @ViewChild('scrollTopicFormToBottom') topicFormScroller: ElementRef;

  routineCreationForm: FormGroup<IRoutineForm>;

  private saveRoutineSubscription: Subscription;

  formSaveStatus: boolean = false;

  constructor(private routineCreatorService: RoutineCreatorService, private router: Router) {
  }

  ngOnInit(): void {
    this.routineCreationForm = new FormGroup<IRoutineForm>({
      'routineTitle': new FormControl<string>('', [Validators.required]),
      'topics': new FormArray<FormGroup<ITopicForm>>([
        TopicCreatorComponent.addTopicForm()
      ])
    });
  }

  ngOnDestroy() {
    if (this.saveRoutineSubscription){
      this.saveRoutineSubscription.unsubscribe();
    }
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
    //this.formSaveStatus = true;
    this.routineCreatorService.buildAndSaveRoutine(this.routineCreationForm.controls);
  }


  onAddTopicClicked(){
    this.topicFormArray?.push(TopicCreatorComponent.addTopicForm());
  }

  get topicFormArray(): FormArray<FormGroup<ITopicForm>>{
    return (<FormArray<FormGroup<ITopicForm>>>this.routineCreationForm?.get('topics'));
  }

  deleteTopic(topicIndex: number){
    this.topicFormArray?.removeAt(topicIndex);
  }
}
