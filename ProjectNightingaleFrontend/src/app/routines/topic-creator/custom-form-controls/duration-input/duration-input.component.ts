import { Component } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DurationInputComponent
    }
  ]
})

export class DurationInputComponent implements ControlValueAccessor{

  duration: string;

  onChange: (duration: string) => void = (duration: string) => {};
  onTouched: () => void = () => {};

  isDisabled: boolean = false;
  isTouched: boolean = false

  changeDuration($event: Event) {
    const duration: string = (<HTMLInputElement>$event.target).value.trim();
    this.markAsTouched();
    if(!this.isDisabled){
      this.duration = duration;
      this.onChange(this.duration);
    }
  }
  writeValue(duration: string): void {
    this.duration = duration;
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
