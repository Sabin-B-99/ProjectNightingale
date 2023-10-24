import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appChordTooltip]'
})
export class ChordTooltipDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
