import {Component, Input, OnInit} from '@angular/core';
import {Topic} from "../../models/topic-model/topic";
import {map, Subscription, takeWhile, timer} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit{

  topic: Topic;

  @Input()
  initialDuration : number = 10;


  remainingDuration: number;
  timeRemainingSubscription: Subscription;

  playButtonPressed: boolean = false;
  pauseButtonPressed: boolean = false;
  resetButtonPressed: boolean = true;


  constructor() {
  }

  ngOnInit() {
    this.remainingDuration = this.initialDuration;
  }

  onPlayTimerClicked() {
   this.setPlayPauseResetPressed(true, false, false);
    this.timeRemainingSubscription  = this.getTimer(this.remainingDuration, 1000)
      .subscribe(remDuration =>{
        this.remainingDuration = remDuration;
      });
  }

  onPauseTimerClicked() {
    this.setPlayPauseResetPressed(false, true, false);
    if(this.timeRemainingSubscription){
      this.timeRemainingSubscription.unsubscribe();
    }
  }

  onResetTimerClicked() {
    this.setPlayPauseResetPressed(false, false, true);
    if(this.timeRemainingSubscription){
      this.timeRemainingSubscription.unsubscribe();
      this.remainingDuration = this.initialDuration;
    }
  }

  getTimer(start:number, ticks: number){
    return timer(0,ticks)
      .pipe(map(elapsedTime => start - elapsedTime),
        takeWhile(remainingTime => remainingTime >= 0));
  }

  setPlayPauseResetPressed(playPressed: boolean, pausePressed: boolean, resetPressed: boolean){
    this.playButtonPressed = playPressed;
    this.pauseButtonPressed = pausePressed;
    this.resetButtonPressed = resetPressed;
  }

}
