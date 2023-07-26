import {Component, OnDestroy, OnInit} from '@angular/core';
import {Metronome} from "../models/metronome-model/metronome";
import {MetronomeService} from "../services/metronome.service";

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

//TODO: Properly schedule metronome beat intervals and sounds.
export class MetronomeComponent implements OnInit{
  metronome: Metronome;

  constructor(private metronomeService: MetronomeService) {
    this.metronome = metronomeService.getMetronome();
  }
  ngOnInit() {
  }


  changeCurrentBPM(value: string) {
    this.metronome.changeBPM(+value);
  }

  playMetronomeSound() {
    this.metronome.start();
  }

  stopMetronomeSound() {
    this.metronome.stop();
  }

  protected readonly Metronome = Metronome;

  increaseBeatsPerMeasure() {
    this.metronome.increaseBeatsPerMeasure();
  }

  decreaseBeatsPerMeasure() {
    this.metronome.decreaseBeatsPerMeasure();
  }
}
