import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {RoutineService} from "../services/routine.service";
import {IRoutine} from "../types/song-interfaces";
@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent implements OnInit{

  selectedRoutineSubscription: Subscription;
  loadedRoutine: IRoutine;

  selectedTopicIndex = 0;

  constructor(private routineService: RoutineService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedRoutineSubscription = this.route.params
      .pipe(switchMap(param => this.routineService.loadRoutineAndItsTopicContentsByRoutineId(+param['id'])))
      .subscribe(routine => this.loadedRoutine = routine);
  }

  onPrevClicked() {
    if(this.selectedTopicIndex === 0){
      this.selectedTopicIndex = 0 ;
    }else {
      this.selectedTopicIndex -= 1;
    }
  }

  onNextClicked() {
    if(this.loadedRoutine.topics){
      if(this.selectedTopicIndex === this.loadedRoutine.topics?.length - 1){
        this.selectedTopicIndex = this.loadedRoutine.topics?.length - 1;
      }else {
        this.selectedTopicIndex += 1;
      }
    }
  }
}
