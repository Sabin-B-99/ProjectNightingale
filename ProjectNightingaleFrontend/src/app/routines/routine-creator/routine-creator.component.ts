import { Component } from '@angular/core';

@Component({
  selector: 'app-routine-creator',
  templateUrl: './routine-creator.component.html',
  styleUrls: ['./routine-creator.component.css']
})
export class RoutineCreatorComponent {
  totalTopicInRoutine:number= 0;

   topicAdded():void  {
    this.totalTopicInRoutine += 1;
  }
}
