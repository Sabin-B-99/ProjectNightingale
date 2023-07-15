import { Component } from '@angular/core';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})
export class MetronomeComponent {

  minBPMVal: number = 30;
  maxBPMVal: number = 230;
  currentBPM: number;

  constructor() {
    this.currentBPM = this.maxBPMVal < this.minBPMVal ? this.minBPMVal : (this.maxBPMVal - this.minBPMVal) / 2;
  }
  setCurrentBPM(value: string) {
    this.currentBPM =  parseInt(value);
  }
}
