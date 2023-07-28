import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IMetronomeValues} from "../../../../types/custom-interfaces";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-metronome-menu',
  templateUrl: './metronome-menu.component.html',
  styleUrls: ['./metronome-menu.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MetronomeMenuComponent
    }
  ]
})

export class MetronomeMenuComponent implements ControlValueAccessor, OnInit{

  @Output()
  metronomeMenuClosed: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  metronomeMenuSaved: EventEmitter<IMetronomeValues> = new EventEmitter<IMetronomeValues>();


  @Input()
  metronomeValueForEdit: IMetronomeValues;

  metronomeValue: IMetronomeValues;
  onChange: (metronomeValue: IMetronomeValues) => void = (metronomeValue: IMetronomeValues) => {};
  onTouched: () => void = () => {};
  isDisabled: boolean = false;
  isTouched: boolean = false;

  constructor() {
  }

  ngOnInit() :void{
    if(this.metronomeValueForEdit){
      this.changeMetronomeValue(this.metronomeValueForEdit);
    }
  }

  changeMetronomeValue(value: IMetronomeValues){
    this.markAsTouched();
    if(!this.isDisabled){
      this.metronomeValue = value;
      this.onChange(this.metronomeValue);
    }
  }

  onMetronomeCloseClicked() {
    this.metronomeMenuClosed.next();
  }

  onMetronomeSaveClicked() {
    this.metronomeMenuSaved.next(this.metronomeValue);
  }


  writeValue(metronomeValue: IMetronomeValues): void {
    this.metronomeValue = metronomeValue;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private markAsTouched(){
    if(!this.isTouched){
      this.onTouched();
      this.isTouched = true;
    }
  }

}
