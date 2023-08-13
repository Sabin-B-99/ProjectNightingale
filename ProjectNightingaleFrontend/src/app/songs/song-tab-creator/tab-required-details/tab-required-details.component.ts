import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormArrayName, FormControl, FormGroup, Validators} from "@angular/forms";
import {IChords} from "../../../types/custom-interfaces";

@Component({
  selector: 'app-tab-required-details',
  templateUrl: './tab-required-details.component.html',
  styleUrls: ['./tab-required-details.component.css']
})
export class TabRequiredDetailsComponent implements OnInit{

  @Input()
  tabRequiredDetailForm: FormGroup;

  difficultyLevels: string[] = ['Easy', 'Intermediate', 'Hard']
  otherArtistJoinPhrase: string[] = ['feat.', 'with'];
  tuningTypes: string[] = [
    'Standard',
    'Not Standard',
    'Tune 3',
    'Tune 4'
  ]
  constructor() {
  }

  ngOnInit() {
  }


  static getTabRequiredDetailForm(): FormGroup{
    return new FormGroup({
      'songTitle': new FormControl<string>('', Validators.required),
      'artistName': new FormControl<string>('', Validators.required),
      'otherArtistsJoinPhrase': new FormControl('', Validators.required),
      'otherArtistsNames': new FormArray<FormControl<string>>([]),
      'tuningType': new FormControl<string>('', [Validators.required]),
      'difficulty': new FormControl<string>('', [Validators.required]),
      'chords': new FormControl<IChords[]>([]),
    });
  }

  get otherArtistsNameInputArray(){
    return <FormArray>(this.tabRequiredDetailForm?.get('otherArtistsNames'));
  }


  addSongChords() {
  }

  addOtherArtistsInput() {
    this.otherArtistsNameInputArray.push(
      new FormControl<string>('', [Validators.required])
    )
  }

  removeArtistNameInputArray(index: number) {
    this.otherArtistsNameInputArray.removeAt(index);
  }
}
