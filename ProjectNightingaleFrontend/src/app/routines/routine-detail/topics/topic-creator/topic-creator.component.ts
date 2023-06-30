import {
  Component, ComponentRef,
  EventEmitter,
  Input, OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TopicChordChangesSelectorDirective} from "../../../../directives/topic-chord-changes-selector.directive";
import {TopicChordChangesMenuComponent} from "./topic-chord-changes-menu/topic-chord-changes-menu.component";
import {TopicChordsSelectorDirective} from "../../../../directives/topic-chords-selector.directive";
import {TopicChordsMenuComponent} from "./topic-chords-menu/topic-chords-menu.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent implements OnDestroy{


  @Input()
  topicForm: FormGroup;

  @Input()
  indexInCurrentRoutine: number;

  @Input()
  totalTopics: number;

  @ViewChild(TopicChordChangesSelectorDirective, {static: false})
  chordChangesMenuHost!: TopicChordChangesSelectorDirective;

  private closeChordChangesMenuSubscription: Subscription;

  @ViewChild(TopicChordsSelectorDirective, {static: false})
  chordsMenuHost!: TopicChordsSelectorDirective;

  private closeChordsMenuSubscription: Subscription;

  @Output()
  deleteTopicEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  static addTopicForm(): FormGroup{
    return new FormGroup({
      'topicTitle': new FormControl(null),
      'topicSongTitle': new FormControl(null),
      'topicStrumPattern': new FormControl(null),
      'topicTime': new FormControl(null)
    })
  }

  deleteTopic(topicIndex: number){
    this.deleteTopicEvent.emit(topicIndex);
  }

  onAddChordsButtonClicked() {
    this.loadTopicChordsMenuComponent();
  }

  onAddChangesButtonClicked() {
    this.loadTopicChordChangesMenuComponent();
  }

  loadTopicChordChangesMenuComponent(){
    const viewContainerRef: ViewContainerRef = this.chordChangesMenuHost.viewContainerRef;
    viewContainerRef.clear();

    const chordChangesMenuComponent: ComponentRef<TopicChordChangesMenuComponent> =
      viewContainerRef.createComponent<TopicChordChangesMenuComponent>(TopicChordChangesMenuComponent);

    this.closeChordChangesMenuSubscription = chordChangesMenuComponent.instance.close
      .subscribe(
        ()=>{
          this.closeChordChangesMenuSubscription.unsubscribe();
          viewContainerRef.clear();
        }
      )
  }

  loadTopicChordsMenuComponent(){
    const viewContainerRef: ViewContainerRef = this.chordsMenuHost.viewContainerRef;
    viewContainerRef.clear();

    const chordsMenuComponent: ComponentRef<TopicChordsMenuComponent> =
      viewContainerRef.createComponent<TopicChordsMenuComponent>(TopicChordsMenuComponent);

     this.closeChordsMenuSubscription = chordsMenuComponent.instance.close.subscribe(
       () =>{
         this.closeChordsMenuSubscription.unsubscribe();
         viewContainerRef.clear();
       }
    )
  }

  ngOnDestroy(): void {
    if(this.closeChordChangesMenuSubscription){
      this.closeChordChangesMenuSubscription.unsubscribe();
    }
    if(this.closeChordsMenuSubscription){
      this.closeChordsMenuSubscription.unsubscribe();
    }
  }
}
