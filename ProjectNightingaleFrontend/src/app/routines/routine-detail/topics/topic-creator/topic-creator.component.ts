import {
  ChangeDetectorRef,
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
import {Topic} from "../../../../models/topic-model/topic";
import {Chord} from "../../../../models/chord-model/chord";
import {TopicCreatorService} from "../../../../services/topic-creator.service";
import {ChordChange} from "../../../../models/chord-change/chord-change";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent implements OnDestroy{

  topicCreated: Topic = new Topic('');

  @Input()
  topicForm: FormGroup;

  @Input()
  indexInCurrentRoutine: number;

  @Input()
  totalTopics: number;

  @ViewChild(TopicChordChangesSelectorDirective, {static: false})
  chordChangesMenuHost!: TopicChordChangesSelectorDirective;

  private closeChordChangesMenuSubscription: Subscription;
  private saveChordChangesMenuSubscription: Subscription;


  @ViewChild(TopicChordsSelectorDirective, {static: false})
  chordsMenuHost!: TopicChordsSelectorDirective;

  private closeChordsMenuSubscription: Subscription;
  private saveChordsMenuSubscription: Subscription;

  @Output()
  deleteTopicEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private topicCreatorService: TopicCreatorService) {
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
      );

    this.saveChordChangesMenuSubscription = chordChangesMenuComponent.instance.save
      .subscribe(
        (chordChanges: ChordChange[]) =>{
          this.topicCreated.setChordChanges(chordChanges);
          this.saveChordChangesMenuSubscription.unsubscribe();
          viewContainerRef.clear();
        }
      );
    if(this.topicCreated.chordChanges.length > 0){
      chordChangesMenuComponent.instance.setChordChangesForEdit(this.topicCreated.chordChanges.slice());
    }
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
    );

    this.saveChordsMenuSubscription = chordsMenuComponent.instance.save
      .subscribe(
        (chords: Chord[]) =>{
          this.topicCreated.setSelectedChords(chords);
          this.saveChordsMenuSubscription.unsubscribe();
          viewContainerRef.clear();
        }
      );

    if(this.topicCreated.selectedChords.length > 0){
      chordsMenuComponent.instance.setSelectedChordsForEdit(this.topicCreated.selectedChords.slice());
    }
  }

  ngOnDestroy(): void {
    this.topicCreatorService.addTopic(this.topicCreated);
    if(this.closeChordChangesMenuSubscription){
      this.closeChordChangesMenuSubscription.unsubscribe();
    }
    if(this.closeChordsMenuSubscription){
      this.closeChordsMenuSubscription.unsubscribe();
    }
    if(this.saveChordsMenuSubscription){
      this.saveChordsMenuSubscription.unsubscribe();
    }
    if(this.saveChordChangesMenuSubscription){
      this.saveChordChangesMenuSubscription.unsubscribe();
    }
  }
}
