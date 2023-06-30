import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTopicChordsSelector]'
})
export class TopicChordsSelectorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
