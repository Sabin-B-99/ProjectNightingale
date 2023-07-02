import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDivToggled]'
})
export class DivToggledDirective {
  constructor(private elemRef:ElementRef) { }

  @HostListener('click')
  onMouseClick(){
    this.setDivActive('skyblue');
  }

  private setDivActive(color: string){
    this.elemRef.nativeElement.style.backgroundColor = color;
  }
}
