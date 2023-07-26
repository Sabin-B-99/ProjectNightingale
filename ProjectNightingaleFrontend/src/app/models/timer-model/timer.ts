export class Timer{

  private timerInterval: number;
  private expectedTimeWithoutDrift: number;
  private timeOutId: number;

  private workCallback: () => void;
  private errorCallback?: () => void;
  private immediateRun: boolean;


  constructor( workCallback: () => void, immediateRun: boolean = false, timerInterval: number = 1000,  errorCallback?: () => void) {
    this.workCallback = workCallback;
    this.timerInterval = timerInterval;
    this.errorCallback = errorCallback;
    this.immediateRun = immediateRun;
  }

  startTimer(){
    this.expectedTimeWithoutDrift = Date.now() + this.timerInterval;
    if(this.immediateRun){
      this.workCallback();
    }
    this.timeOutId = setTimeout(() =>{this.loopTimer()}, this.timerInterval);
  }

  stopTimer(){
    clearTimeout(this.timeOutId);
  }

  updateInterval(updatedTimerInterval: number){
    this.timerInterval = updatedTimerInterval;
  }

  private loopTimer(){
    // console.log("Time at function is expected to run: ", this.expectedTimeWithoutDrift);
    let drift: number = Date.now() - this.expectedTimeWithoutDrift;
    // console.log("Time at which function actually runs: ", Date.now());
    // console.log("Drift: ", drift);
    if(drift > this.timerInterval && this.errorCallback){
      this.errorCallback();
    }
    this.workCallback();
    this.expectedTimeWithoutDrift += this.timerInterval;
    this.timeOutId = setTimeout(() => {this.loopTimer()}, this.timerInterval - drift);
  }

}
