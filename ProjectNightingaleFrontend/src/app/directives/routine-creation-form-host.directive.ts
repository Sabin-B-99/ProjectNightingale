import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appRoutineCreationFormHost]'
})
export class RoutineCreationFormHostDirective {


  constructor(public viewContainerRef: ViewContainerRef) { }

}
