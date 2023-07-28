import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Metronome} from "../models/metronome-model/metronome";
import {IMetronomeValues} from "../types/custom-interfaces";
import {Subject} from "rxjs";

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.html',
  styleUrls: ['./metronome.component.css']
})

//TODO: Properly schedule metronome beat intervals and sounds.
export class MetronomeComponent implements OnInit, OnDestroy{
  metronome: Metronome;

  metronomeValues: IMetronomeValues;

  @Input()
  initialMetronomeValues: IMetronomeValues;

  @Output()
  metronomeValuesChanged: EventEmitter<IMetronomeValues> = new EventEmitter<IMetronomeValues>();
  constructor() {
    this.metronome = new Metronome();
    this.metronomeValues = {bpm: this.metronome.getCurrentBPM(), beatsPerMeasure: this.metronome.getCurrentBeatsPerMeasure()};
  }
  ngOnInit() :void{
    if(this.initialMetronomeValues){
      this.metronome.changeBPM(this.initialMetronomeValues.bpm);
      this.metronome.changeBeatsPerMeasure(this.initialMetronomeValues.beatsPerMeasure);
      this.metronomeValues = {bpm: this.metronome.getCurrentBPM(), beatsPerMeasure: this.metronome.getCurrentBeatsPerMeasure()};
    }
  }

  ngOnDestroy() :void{
    this.metronome.stop();
    this.metronome.reset();
  }

  changeCurrentBPM(value: string) {
    this.metronome.changeBPM(+value);
    this.emitChangedValues();
  }

  emitChangedValues(){
    this.metronomeValues.bpm = this.metronome.getCurrentBPM();
    this.metronomeValues.beatsPerMeasure = this.metronome.getCurrentBeatsPerMeasure();
    this.metronomeValuesChanged.next(this.metronomeValues);
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
    this.emitChangedValues();
  }

  decreaseBeatsPerMeasure() {
    this.metronome.decreaseBeatsPerMeasure();
    this.emitChangedValues();
  }
}
