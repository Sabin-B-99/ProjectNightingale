import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MetronomeService} from "../../../../../services/metronome.service";
import {IMetronomeValues} from "../../../../../types/custom-interfaces";
import {Subscription} from "rxjs";
import {Metronome} from "../../../../../models/metronome-model/metronome";

@Component({
  selector: 'app-metronome-menu',
  templateUrl: './metronome-menu.component.html',
  styleUrls: ['./metronome-menu.component.css']
})

export class MetronomeMenuComponent implements OnInit, OnDestroy{

  @Output()
  metronomeMenuClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  metronomeMenuSaved: EventEmitter<IMetronomeValues> = new EventEmitter<IMetronomeValues>();

  metronomeSavedValueChangedSubscription: Subscription;

  private currentMetronome: Metronome;


  constructor(private metronomeService: MetronomeService) {
    this.currentMetronome = metronomeService.getMetronome();
  }

  ngOnInit() :void{
    this.metronomeSavedValueChangedSubscription = this.metronomeService.savedMetronomeValuesChanged
      .subscribe(
        (metronomeValues: IMetronomeValues)=>{
          this.currentMetronome.changeBPM(metronomeValues.bpm);
          this.currentMetronome.changeBeatsPerMeasure(metronomeValues.beatsPerMeasure);
        }
      );
  }

  ngOnDestroy() :void{
    if(this.metronomeSavedValueChangedSubscription){
      this.metronomeSavedValueChangedSubscription.unsubscribe();
    }
  }

  onMetronomeCloseClicked() {
    this.metronomeMenuClosed.next();
    this.currentMetronome.stop();
  }

  onMetronomeSaveClicked() {
    let savedValues: IMetronomeValues = { bpm: this.metronomeService.getMetronome().getCurrentBPM(),
        beatsPerMeasure: this.currentMetronome.getCurrentBeatsPerMeasure()}
    this.metronomeMenuSaved.next(savedValues);
    this.currentMetronome.stop();
  }

}
