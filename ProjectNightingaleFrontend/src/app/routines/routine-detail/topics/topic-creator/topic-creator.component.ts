import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent implements OnInit, OnDestroy, AfterViewInit{

  @Input() parentRoutineFormObservable: Observable<FormGroup> = new Observable();
  parentRoutineFormSubscription: Subscription;

  topicForm: FormGroup;

  ngOnInit(): void {
    this.topicForm = new FormGroup<any>({
      'topicTitleInput': new FormControl(null),
      'topicSongInput': new FormControl(null),
      'topicStrumPatternInput': new FormControl(null),
      'topicTimeInput': new FormControl(null)
    });
  }

  ngOnDestroy(): void {
    this.parentRoutineFormSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.parentRoutineFormSubscription = this.parentRoutineFormObservable
      .subscribe((parentRoutineForm: FormGroup) =>{
        console.log(parentRoutineForm);
      });
  }
}
