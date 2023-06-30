import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTopicChordChangesSelector]'
})
export class TopicChordChangesSelectorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
