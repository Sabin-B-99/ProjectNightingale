import { Injectable } from '@angular/core';
import {Metronome} from "../models/metronome-model/metronome";
import {IMetronomeValues} from "../types/custom-interfaces";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MetronomeService {

  private readonly metronome : Metronome;
  savedMetronomeValuesChanged: Subject<IMetronomeValues> = new Subject<IMetronomeValues>();

  private savedMetronomeValues: IMetronomeValues;
  constructor() {
    this.metronome = new Metronome();
  }
  getMetronome(): Metronome{
    return this.metronome;
  }

  setSavedMetronomeValuesForEdit(savedMetronomeValues: IMetronomeValues){
    this.savedMetronomeValues = savedMetronomeValues;
  }
}
