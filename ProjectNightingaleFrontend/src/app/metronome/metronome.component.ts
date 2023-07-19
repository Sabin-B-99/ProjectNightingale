import { Component } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

//TODO: Properly schedule metronome beat intervals and sounds.
export class MetronomeComponent {

  readonly MIN_BPM_VAL: number = 30;
  readonly MAX_BPM_VAL: number = 230;

  private metronomeAudio: HTMLAudioElement;
  currentBPM: number;

  private playBeatEveryXMs: number = 0;
  private metronomeStopped: boolean = false;

  private beatInterval: number;

  constructor() {
    this.currentBPM = this.MAX_BPM_VAL < this.MIN_BPM_VAL ? this.MIN_BPM_VAL
      : (this.MAX_BPM_VAL - this.MIN_BPM_VAL) / 2;
    this.playBeatEveryXMs = Math.floor((60 / this.currentBPM) * 1000);
    this.metronomeAudio = new Audio();
    this.metronomeAudio.src = "../assets/sounds/metronome.mp3";
    this.metronomeAudio.load();
  }

  changeCurrentBPM(value: string) {
    this.currentBPM =  parseInt(value);
    this.playBeatEveryXMs = Math.floor((60 / this.currentBPM) * 1000);
    this.stopMetronomeSound();
    this.playMetronomeSound();
  }

  playMetronomeSound() {
    if(this.currentBPM > this.MAX_BPM_VAL){
      this.currentBPM = this.MAX_BPM_VAL;
    }
    if(this.currentBPM < this.MIN_BPM_VAL){
      this.currentBPM = this.MIN_BPM_VAL;
    }
      this.beatInterval = setInterval( (): void =>{
        console.log(this.playBeatEveryXMs);
        this.metronomeAudio.play();
      }, this.playBeatEveryXMs);
  }

  stopMetronomeSound() {
    clearInterval(this.beatInterval);
    this.metronomeStopped = true;
    this.metronomeAudio.pause();
  }
}
