import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Topic} from "../../models/topic-model/topic";
import {Chord} from "../../models/chord-model/chord";
import {ChordChange} from "../../models/chord-change-model/chord-change";
import {IMetronomeValues} from "../../types/custom-interfaces";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent{

  private static readonly TOPIC_DURATION_DEFAULT_VALUE: string = "00:03:00";

  topicCreated: Topic = new Topic('');

  @Input()
  topicForm: FormGroup;

  @Input()
  indexInCurrentRoutine: number;

  @Input()
  totalTopics: number;


  @Output()
  deleteTopicEvent: EventEmitter<number> = new EventEmitter<number>();


  showMetronomeMenu: boolean = false;
  showChordsSelectionMenu: boolean = false;
  showChordChangesMenu: boolean = false;

  constructor() {
  }

  static addTopicForm(): FormGroup{
    return new FormGroup({
      'topicTitle': new FormControl(null, [Validators.required]),
      'topicSongTitle': new FormControl(null),
      'topicChords': new FormControl([]),
      'topicChordChanges': new FormControl([]),
      'strumPatterns': new FormArray([]),
      'topicMetronome' : new FormControl(),
      'topicTime': new FormControl( this.TOPIC_DURATION_DEFAULT_VALUE,
        [Validators.pattern(new RegExp("^\\d+:\\d{2}:\\d{2}$"))])
    })
  }

  get strumInputArray(): FormArray<FormControl>{
    return (<FormArray<FormControl>>this.topicForm?.get('strumPatterns'));
  }

  onAddStrumPatternInputClicked() {
    this.strumInputArray.push(
      new FormControl(null)
    );
  }

  deleteTopic(topicIndex: number){
    this.deleteTopicEvent.emit(topicIndex);
  }

  deleteStrumPatternInput(i: number) {
    this.strumInputArray.removeAt(i);
  }

  onAddMetronomeClicked() {
    this.showMetronomeMenu = true;
  }


  closeMetronomeMenu($event: void) {
    this.showMetronomeMenu = false;
  }

  saveMetronomeValues($event: IMetronomeValues) {
    this.topicCreated.setMetronomeValues($event);
    this.showMetronomeMenu = false;
  }

  onAddChordsButtonClicked() {
    this.showChordsSelectionMenu = true;
  }

  onCloseChordsMenuButtonClicked(){
    this.showChordsSelectionMenu = false;
  }

  onSaveChordsMenuButtonClicked($event: Chord[]) {
    this.topicCreated.setSelectedChords($event);
    this.showChordsSelectionMenu = false;
  }

  onAddChordChangesButtonClicked() {
    this.showChordChangesMenu = true;
  }

  onSaveChordChangesMenuButtonClicked($event: ChordChange[]){
    this.topicCreated.setChordChanges($event);
    this.showChordChangesMenu = false;
  }
  onCloseChordChangesMenuButtonClicked() : void{
    this.showChordChangesMenu = false;
  }
}
