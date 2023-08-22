import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IChords} from "../../../types/custom-interfaces";
import {Chord} from "../../../models/chord-model/chord";
import {TabCreatorService} from "../../../services/tab-creator.service";
import {noWhiteSpaceValidator} from "../../../validators/no-white-space-validator.directive";

@Component({
  selector: 'app-tab-required-details',
  templateUrl: './tab-required-details.component.html',
  styleUrls: ['./tab-required-details.component.css']
})
export class TabRequiredDetailsComponent implements OnInit{

  @Input()
  tabRequiredDetailForm: FormGroup;

  @Input()
  harmonicaTabSelected: boolean;

  @Input()
  guitarTabSelected: boolean;
  difficultyLevels: string[] = ['Easy', 'Intermediate', 'Hard']
  otherArtistJoinPhrase: string[] = ['feat.', 'with'];
  tuningTypes: string[] = [
    'Standard',
    'Not Standard',
    'Tune 3',
    'Tune 4'
  ]

  harmonicaTypes: string[] = [
    'Diatonic',
    'Chromatic'
  ]

  harmonicaKeyTypes: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F'
  ]


  chordSelectionMenuOpened: boolean = false;
  selectedChordsForTabCreation: Chord[] = [];
  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit() {
  }


  static getTabRequiredDetailForm(): FormGroup{
    return new FormGroup({
      'songTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'artistName': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'otherArtistsJoinPhrase': new FormControl(''),
      'otherArtistsNames': new FormArray<FormControl<string>>([]),
      'tuningOrHarmonicaType': new FormControl<string>('', [Validators.required]),
      'difficulty': new FormControl<string>('' , [Validators.required]),
      'chords': new FormControl<IChords[]>([]),
      'harmonicaKey': new FormControl<string>('', [Validators.required])
    });
  }
  get otherArtistsNameInputArray(){
    return <FormArray>(this.tabRequiredDetailForm?.get('otherArtistsNames'));
  }

  addOtherArtistsInput() {
    this.otherArtistsNameInputArray.push(
      new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()])
    )
  }

  removeArtistNameInputArray(index: number) {
    this.otherArtistsNameInputArray.removeAt(index);
  }

  onOpenChordSelectionMenu(){
    this.chordSelectionMenuOpened = true;
  }

  onCloseChordSelectionMenu(){
    this.chordSelectionMenuOpened = false;
  }

  onChordsSaved($event: Chord[]) {
    this.chordSelectionMenuOpened = false;
    this.selectedChordsForTabCreation = $event;
    this.tabCreatorService.setSelectedChords(this.selectedChordsForTabCreation.slice());
  }
}
