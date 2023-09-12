import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Chord} from "../../models/chord-model/chord";
import {ChordChange} from "../../models/chord-change-model/chord-change";
import {
  IChordChanges,
  IChords,
  IMetronomeValues,
  ITopic,
  ITopicForm
} from "../../types/custom-interfaces";
import {topicFormAtLeastOneFieldRequired} from "../../validators/topic-form-validator.directive";
import {noWhiteSpaceValidator} from "../../validators/no-white-space-validator.directive";

@Component({
  selector: 'app-topic-creator',
  templateUrl: './topic-creator.component.html',
  styleUrls: ['./topic-creator.component.css']
})
export class TopicCreatorComponent{

  private static readonly TOPIC_DURATION_DEFAULT_VALUE: string = "00:03:00";


  selectedChordChanges: ChordChange[] = [];
  selectedChords: Chord[] = [];
  selectedMetronomeValues: IMetronomeValues = {bpm: 100, beatsPerMeasure: 4};

  @Input()
  topicForm: FormGroup<ITopicForm>;

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

  static addTopicForm(): FormGroup<ITopicForm>{
    return new FormGroup<ITopicForm>({
      'topicTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'topicSongTitle': new FormControl<string>(''),
      'topicChords': new FormControl<IChords[]>([]),
      'topicChordChanges': new FormControl<IChordChanges[]>([]),
      'strumPatterns': new FormArray<FormControl<string | null>>([]),
      'topicMetronome' : new FormControl<IMetronomeValues>({bpm: 100, beatsPerMeasure: 4}),
      'topicTime': new FormControl<string>( this.TOPIC_DURATION_DEFAULT_VALUE,
        [Validators.pattern(new RegExp("^\\d+:\\d{2}:\\d{2}$")), Validators.required])
    }, {validators: topicFormAtLeastOneFieldRequired()})
  }

  static addTopicFormForEdit(topic: ITopic): FormGroup<ITopicForm> {
    for (const [key, value] of Object.entries(topic)){
      console.log(key, value);
    }
    return new FormGroup<ITopicForm>({
      'topicTitle': new FormControl<string>(topic.title, [Validators.required, noWhiteSpaceValidator()]),
      'topicSongTitle': new FormControl<string>(topic.songTitle || ''),
      'topicChords': new FormControl<IChords[]>(topic.chords),
      'topicChordChanges': new FormControl<IChordChanges[]>(topic.topicChordChanges),
      'strumPatterns': new FormArray<FormControl<string|null>>([]),
      'topicMetronome' : new FormControl<IMetronomeValues>(topic.metronomes),
      'topicTime': new FormControl<string>(this.TOPIC_DURATION_DEFAULT_VALUE,
        [Validators.pattern(new RegExp("^\\d+:\\d{2}:\\d{2}$")), Validators.required])
    }, {validators: topicFormAtLeastOneFieldRequired()});
  }

  get strumInputArray(): FormArray<FormControl<string | null>>{
    return (<FormArray<FormControl<string | null>>>this.topicForm?.get('strumPatterns'));
  }

  onAddStrumPatternInputClicked() {
    this.strumInputArray.push(
      new FormControl<string | null>('', [Validators.required, noWhiteSpaceValidator()]));
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
    this.selectedMetronomeValues = $event;
    this.showMetronomeMenu = false;
  }

  onAddChordsButtonClicked() {
    this.showChordsSelectionMenu = true;
  }

  onCloseChordsMenuButtonClicked(){
    this.showChordsSelectionMenu = false;
  }

  onSaveChordsMenuButtonClicked($event: Chord[]) {
    this.selectedChords = $event;
    this.showChordsSelectionMenu = false;
  }

  onAddChordChangesButtonClicked() {
    this.showChordChangesMenu = true;
  }

  onSaveChordChangesMenuButtonClicked($event: ChordChange[]){
    this.selectedChordChanges = $event;
    this.showChordChangesMenu = false;
  }
  onCloseChordChangesMenuButtonClicked() : void{
    this.showChordChangesMenu = false;
  }
}
