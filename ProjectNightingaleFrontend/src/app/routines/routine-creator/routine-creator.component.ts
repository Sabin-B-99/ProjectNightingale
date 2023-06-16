import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TopicCreatorComponent} from "../routine-detail/topics/topic-creator/topic-creator.component";
import {Subject} from "rxjs";
import {RoutineCreationFormHostDirective} from "../../directives/routine-creation-form-host.directive";
import {Topic} from "../../models/topic-model/topic";

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent implements OnInit{




  routineFormSubject: Subject<FormGroup> = new Subject<FormGroup>();
  routineCreationForm: FormGroup;


  @ViewChild(RoutineCreationFormHostDirective, {static: true})
  routineCreationFormHost: RoutineCreationFormHostDirective;



  onRoutineSubmitted() {
     this.routineFormSubject.next(this.routineCreationForm);
     console.log(this.routineCreationForm);
  }


  onAddTopicClicked(){
    const topicFormRef: ComponentRef<TopicCreatorComponent> = this.routineCreationFormHost.viewContainerRef
       .createComponent<TopicCreatorComponent>(TopicCreatorComponent);
  }

  ngOnInit(): void {
     this.routineCreationForm = new FormGroup({
       'titleInput': new FormControl(null)
     });
     this.onAddTopicClicked();
  }
}
