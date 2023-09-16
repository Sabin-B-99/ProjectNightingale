import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TopicCreatorComponent} from "../topic-creator/topic-creator.component";
import {RoutineCreatorService} from "../../services/routine-creator.service";
import {Router} from "@angular/router";
import {IRoutine, IRoutineForm, ITopicForm} from "../../types/custom-interfaces";
import {Subscription} from "rxjs";
import {noWhiteSpaceValidator} from "../../validators/no-white-space-validator.directive";
import {RoutineService} from "../../services/routine.service";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit, OnDestroy ,AfterViewChecked{

  @ViewChild('scrollTopicFormToBottom') topicFormScroller: ElementRef;

  routineCreationForm: FormGroup<IRoutineForm>;

  private saveRoutineSubscription: Subscription;

  private loadRoutineSubscription: Subscription;

  formSaveStatus: boolean = false;

  constructor(private routineCreatorService: RoutineCreatorService, private routineService: RoutineService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeRoutineCreationForm();
  }

  initializeRoutineCreationForm(){
    if(this.routineCreatorService.getRoutineEditMode()){
     this.initializeRoutineCreationFormForEdit();
    }else {
     this.initializeNewRoutineCreationForm();
    }
  }

  private initializeRoutineCreationFormForEdit(){
    this.routineCreationForm = new FormGroup<IRoutineForm>({
      'routineTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'topics': new FormArray<FormGroup<ITopicForm>>([])
    });

    const routineIdForEdit: number = this.routineCreatorService.getRoutineForEdit();
    this.loadRoutineSubscription = this.routineService.loadRoutineAndItsTopicContentsByRoutineId(routineIdForEdit)
      .subscribe((routine: IRoutine) =>{
        this.routineCreationForm.get('routineTitle')?.patchValue(routine.title);
        if(routine.topics){
          for (const topic of routine.topics) {
            this.topicFormArray.push(TopicCreatorComponent.addTopicFormForEdit(topic));
            this.routineService.topicsToEdit.push(topic);
          }
        }
      });
  }
  private initializeNewRoutineCreationForm(){
    this.routineCreationForm = new FormGroup<IRoutineForm>({
      'routineTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'topics': new FormArray<FormGroup<ITopicForm>>([
        TopicCreatorComponent.addTopicForm()
      ])
    });
  }

  ngOnDestroy() {
    if (this.saveRoutineSubscription){
      this.saveRoutineSubscription.unsubscribe();
    }
    this.routineService.topicsToEdit.splice(0, this.routineService.topicsToEdit.length);
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
    this.formSaveStatus = true;
    if(this.routineCreationForm.valid){
      this.saveRoutineSubscription = this.routineCreatorService.buildAndSaveRoutine(this.routineCreationForm.controls)
        .subscribe(
          (routineSaved: boolean) =>{
            if(routineSaved){
              this.router.navigate(['routines']);
            }
          });
    }
    this.routineCreatorService.setEditMode(false);
    this.formSaveStatus = false;
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
