import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTopicChordsSelector]'
})
export class TopicChordChangesSelectorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
