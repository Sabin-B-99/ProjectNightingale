import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ISongTabCreationRequiredDetailsForm} from "../../../types/custom-interfaces";
import {TabCreatorService} from "../../../services/tab-creator.service";
import {noWhiteSpaceValidator} from "../../../validators/no-white-space-validator.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tab-required-details',
  templateUrl: './tab-required-details.component.html',
  styleUrls: ['./tab-required-details.component.css']
})
export class TabRequiredDetailsComponent implements OnInit, OnDestroy{

  @Input()
  tabRequiredDetailForm: FormGroup<ISongTabCreationRequiredDetailsForm>;

  @Input()
  harmonicaTabSelected: boolean;

  @Input()
  guitarTabSelected: boolean;

  @Input()
  lyricsSelected: boolean;

  difficultyLevels: string[] = []
  difficultyLevelsSubscription: Subscription;

  otherArtistJoinPhrase: string[] = [];
  otherArtistsJoinPhraseSubscription: Subscription;

  tuningTypes: string[] = []
  tuningTypesSubscription: Subscription;

  harmonicaTypes: string[] = [];
  harmonicaTypesSubscription: Subscription;

  harmonicaKeyTypes: string[] = [];
  harmonicaKeyTypesSubscription: Subscription;

  capos: string[] = [];
  caposSubscription: Subscription;

  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit() {
    this.harmonicaTypesSubscription = this.tabCreatorService.loadHarmonicaTypes()
      .subscribe( (harmonicaTypes: string[]) =>{
        this.harmonicaTypes = harmonicaTypes;
      })

    this.harmonicaKeyTypesSubscription = this.tabCreatorService.loadHarmonicaKeys()
      .subscribe( (harmonicaKeys: string[]) =>{
        this.harmonicaKeyTypes = harmonicaKeys;
      })

    this.difficultyLevelsSubscription = this.tabCreatorService.loadDifficultyLevels()
      .subscribe((difficultyLevels: string[]) =>{
        this.difficultyLevels = difficultyLevels;
      })

    this.otherArtistsJoinPhraseSubscription  = this.tabCreatorService.loadJoinPhrases()
      .subscribe( (joinPhrases: string[]) =>{
        this.otherArtistJoinPhrase = joinPhrases;
      });

    this.tuningTypesSubscription = this.tabCreatorService.loadGuitarTunings()
      .subscribe( (tuningTypes: string[]) =>{
        this.tuningTypes = tuningTypes;
      });

    this.caposSubscription = this.tabCreatorService.loadCapoPositions()
      .subscribe((capoPositions: string[]) =>{
        this.capos = capoPositions;
      });

  }

  ngOnDestroy() {
    if(this.tuningTypesSubscription){
      this.tuningTypesSubscription.unsubscribe();
    }

    if(this.caposSubscription){
      this.caposSubscription.unsubscribe()
    }

    if(this.otherArtistsJoinPhraseSubscription){
      this.otherArtistsJoinPhraseSubscription.unsubscribe();
    }

    if(this.harmonicaTypesSubscription){
      this.harmonicaTypesSubscription.unsubscribe();
    }

    if(this.harmonicaKeyTypesSubscription){
      this.harmonicaKeyTypesSubscription.unsubscribe();
    }

    if(this.difficultyLevelsSubscription){
      this.difficultyLevelsSubscription.unsubscribe();
    }
  }


  static getTabRequiredDetailForm(): FormGroup<ISongTabCreationRequiredDetailsForm> {
    return new FormGroup<ISongTabCreationRequiredDetailsForm>({
      'songTitle': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'artistName': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
      'otherArtistsJoinPhrase': new FormControl(''),
      'otherArtistsNames': new FormArray<FormControl<string | null>>([]),
      'tuningType': new FormControl<string>('', [Validators.required]),
      'harmonicaType': new FormControl<string>('', [Validators.required]),
      'difficulty': new FormControl<string>('' , [Validators.required]),
      'harmonicaKey': new FormControl<string>('', [Validators.required]),
      'capoFret': new FormControl<string>('', [Validators.required])
    });
  }
  get otherArtistsNameInputArray(){
    return <FormArray<FormControl<string | null>>>(this.tabRequiredDetailForm?.get('otherArtistsNames'));
  }

  addOtherArtistsInput() {
    this.otherArtistsNameInputArray.push(
      new FormControl<string | null>('', [Validators.required, noWhiteSpaceValidator()])
    )
  }

  removeArtistNameInputArray(index: number) {
    this.otherArtistsNameInputArray.removeAt(index);
  }
}
