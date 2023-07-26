import {Timer} from "../timer-model/timer";

export class Metronome {

  public static readonly MIN_BPM_VAL: number = 30;
  public static readonly MAX_BPM_VAL: number = 230;
  private static readonly MAX_BEATS_PER_MEASURE: number = 8;
  private static readonly MIN_BEATS_PER_MEASURE: number = 2;

  private currentBPM: number;
  private currentBeatsPerMeasure: number = 4;
  private currentBeatCount: number = 0;

  private metronomeAudioClick1: HTMLAudioElement;
  private metronomeAudioClick2: HTMLAudioElement;


  private metronomeTimer: Timer;
  constructor() {

    this.currentBPM = Metronome.MAX_BPM_VAL < Metronome.MIN_BPM_VAL ? Metronome.MIN_BPM_VAL
      : (Metronome.MAX_BPM_VAL - Metronome.MIN_BPM_VAL) / 2;

    this.metronomeAudioClick1 = new Audio();
    this.metronomeAudioClick1.src = "../assets/sounds/metronome/click1.mp3";
    this.metronomeAudioClick1.load();

    this.metronomeAudioClick2 = new Audio();
    this.metronomeAudioClick2.src = "../assets/sounds/metronome/click2.mp3";
    this.metronomeAudioClick2.load();

    this.metronomeTimer = new Timer( () =>{
      this.play();
    }, true, 60000/this.currentBPM);
  }

  private validateTempo(){
    if(this.currentBPM >= Metronome.MAX_BPM_VAL){
      this.currentBPM = Metronome.MAX_BPM_VAL;
    }
    if(this.currentBPM <= Metronome.MIN_BPM_VAL){
      this.currentBPM = Metronome.MIN_BPM_VAL;
    }
  }
  private validateBeatsPerMeasure(){
    if(this.currentBeatsPerMeasure >= Metronome.MAX_BEATS_PER_MEASURE){
      this.currentBeatsPerMeasure = Metronome.MAX_BEATS_PER_MEASURE;
    }
    if(this.currentBeatsPerMeasure <= Metronome.MIN_BEATS_PER_MEASURE){
      this.currentBeatsPerMeasure = Metronome.MIN_BEATS_PER_MEASURE;
    }
  }

  private play(){
    if(this.currentBeatCount === this.currentBeatsPerMeasure){
      this.currentBeatCount = 0;
    }
    if(this.currentBeatCount === 0){
      this.metronomeAudioClick1.play();
      this.metronomeAudioClick1.currentTime = 0;
    }else {
      this.metronomeAudioClick2.play();
      this.metronomeAudioClick2.currentTime = 0;
    }
    this.currentBeatCount++;
  }

  changeBPM(newBPM: number){
    this.currentBPM = newBPM;
    this.validateTempo();
    this.metronomeTimer.updateInterval((60000/this.currentBPM));
  }

 start(){
    this.validateTempo();
    this.metronomeTimer.startTimer();
 }

  stop(){
    this.metronomeTimer.stopTimer();
  }

  getCurrentBPM(): number {
    return this.currentBPM;
  }

  getCurrentBeatsPerMeasure() {
    return this.currentBeatsPerMeasure;
  }

  increaseBeatsPerMeasure() {
    this.currentBeatsPerMeasure++;
    this.validateBeatsPerMeasure();
    this.currentBeatCount = 0;
  }

  decreaseBeatsPerMeasure(){
    this.currentBeatsPerMeasure--;
    this.validateBeatsPerMeasure();
    this.currentBeatCount = 0;
  }

  changeBeatsPerMeasure(newBeatsPerMeasure: number) {
    this.currentBeatsPerMeasure = newBeatsPerMeasure;
    this.validateBeatsPerMeasure();
    this.currentBeatCount = 0;
  }
}
