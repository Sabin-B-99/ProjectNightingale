import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IChords} from "../../../types/custom-interfaces";
import {Chord} from "../../../models/chord-model/chord";
import {TabCreatorService} from "../../../services/tab-creator.service";

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
    'Chromatic',
    'Diatonic'
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
      'songTitle': new FormControl<string>('', Validators.required),
      'artistName': new FormControl<string>('', Validators.required),
      'otherArtistsJoinPhrase': new FormControl('', Validators.required),
      'otherArtistsNames': new FormArray<FormControl<string>>([]),
      'tuningOrHarmonicaType': new FormControl<string>('', [Validators.required]),
      'difficulty': new FormControl<string>('', [Validators.required]),
      'chords': new FormControl<IChords[]>([]),
      'harmonicaKey': new FormControl<string>('')
    });
  }
  get otherArtistsNameInputArray(){
    return <FormArray>(this.tabRequiredDetailForm?.get('otherArtistsNames'));
  }

  addOtherArtistsInput() {
    this.otherArtistsNameInputArray.push(
      new FormControl<string>('', [Validators.required])
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
