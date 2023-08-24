import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ISongTabCreationRequiredDetailsForm} from "../../../types/custom-interfaces";
import {TabCreatorService} from "../../../services/tab-creator.service";
import {noWhiteSpaceValidator} from "../../../validators/no-white-space-validator.directive";

@Component({
  selector: 'app-tab-required-details',
  templateUrl: './tab-required-details.component.html',
  styleUrls: ['./tab-required-details.component.css']
})
export class TabRequiredDetailsComponent implements OnInit{

  @Input()
  tabRequiredDetailForm: FormGroup<ISongTabCreationRequiredDetailsForm>;

  @Input()
  harmonicaTabSelected: boolean;

  @Input()
  guitarTabSelected: boolean;

  @Input()
  lyricsSelected: boolean;

  difficultyLevels: string[] = []
  otherArtistJoinPhrase: string[] = [];
  tuningTypes: string[] = []
  harmonicaTypes: string[] = [];
  harmonicaKeyTypes: string[] = [];
  capos: string[] = [];

  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit() {
    this.harmonicaTypes = this.tabCreatorService.getHarmonicaTypes();
    this.harmonicaKeyTypes = this.tabCreatorService.getHarmonicaKeyTypes();
    this.difficultyLevels = this.tabCreatorService.getDifficultyLevels();
    this.otherArtistJoinPhrase = this.tabCreatorService.getOtherArtistsJoinPhrase();
    this.tuningTypes = this.tabCreatorService.getTuningTypes();
    this.capos = this.tabCreatorService.getCapos();
  }


  static getTabRequiredDetailForm(): FormGroup<ISongTabCreationRequiredDetailsForm> {
    return new FormGroup<ISongTabCreationRequiredDetailsForm>({
      'songTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'artistName': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'otherArtistsJoinPhrase': new FormControl(''),
      'otherArtistsNames': new FormArray<FormControl<string>>([]),
      'tuningOrHarmonicaType': new FormControl<string>('', [Validators.required]),
      'difficulty': new FormControl<string>('' , [Validators.required]),
      'harmonicaKey': new FormControl<string>('', [Validators.required]),
      'capoFret': new FormControl<string>('', [Validators.required])
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
}
