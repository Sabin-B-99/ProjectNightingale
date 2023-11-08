import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabRequiredDetailsComponent} from "./tab-required-details/tab-required-details.component";
import {TabCreatorService} from "../../services/tab-creator.service";
import {
  ISongTabCreationForm,
  ISongTabCreationRequiredDetailsForm,
  ITableFormCellValue
} from "../../types/song-interfaces";
import {lyricsBracketsValidation} from "../../validators/tab-lyrics-text-brackets-validator.directive";
import {chordsValidator} from "../../validators/valid-chords-validator.directive";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-song-tab-creator',
  templateUrl: './song-tab-creator.component.html',
  styleUrls: ['./song-tab-creator.component.css']
})
export class SongTabCreatorComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('lyricsTabArea') lyricsTabTextArea: ElementRef<HTMLTextAreaElement>;
  readonly LYRICS_TEMPLATE_WORDS_SEP_LINES: number = 5;
  readonly LYRICS_TEMPLATE_WORDS: string[] = ['(Intro)', '(Verse 1)', '(Verse 2)',
    '(Chorus)', '(Bridge)', '(Chorus)'];
  readonly LYRICS_AREA_NO_OF_ROWS: number = 20;
  readonly LYRICS_AREA_NO_OF_COLS: number = 50;

  guitarTabSelected: boolean = true;
  harmonicaTabSelected: boolean = false;
  lyricsSelected: boolean = false;

  // harmonicaTabTextAreaShown: boolean = false;

  tabCreationForm: FormGroup<ISongTabCreationForm>;


  // numOfRowsHarmonicaInputArray: number;
  // numOfColsHarmonicaInputArray: number;
  // harmonicaLyricsLines: Map<number, string>;

  validChords: string[] = [];

  private tabSavedSubscription: Subscription;
  tabSaveStatus: boolean = false;

  private validChordChangedSubscription: Subscription;



  constructor(private router:Router, private tabCreatorService: TabCreatorService) {
  }

  ngOnInit(): void {
    this.tabCreatorService.loadAllValidChordRoots();
    this.tabCreatorService.loadAllValidChordKeys();

    this.tabCreationForm = new FormGroup<ISongTabCreationForm>({
      'tabRequiredDetails': TabRequiredDetailsComponent.getTabRequiredDetailForm(),
      'tabLyricsArea': new FormControl<string>('')
      // 'harmonicaTabArea': new FormControl<ITableFormCellValue[]>([])
    });

    this.validChordChangedSubscription = this.tabCreatorService.validChordsChanged
      .subscribe((validChords: string[])=>{
        this.validChords = validChords;
        this.tabCreationForm.get('tabLyricsArea')?.setValidators([Validators.required,
          lyricsBracketsValidation(), chordsValidator(this.validChords.slice())])
      });
  }



  ngAfterViewInit() {
    this.tabCreatorService.setCursorAt(this.lyricsTabTextArea,2,0);
  }

  ngOnDestroy() {
    if(this.validChordChangedSubscription){
      this.validChordChangedSubscription.unsubscribe();
    }
  }

  onTabCreationFormSubmitted(){
    this.tabSaveStatus = true;
    if(this.tabCreationForm.valid){
      if(this.guitarTabSelected){
        this.tabSavedSubscription = this.tabCreatorService.saveGuitarTab(this.tabCreationForm)
          .subscribe( (tabSaved: boolean) =>{
            if(tabSaved){
              this.router.navigate(['songs']);
            }
            this.tabSaveStatus = false;
          });
      }else if(this.harmonicaTabSelected){
        this.tabSavedSubscription = this.tabCreatorService.saveHarmonicaTab(this.tabCreationForm)
          .subscribe((tabSaved: boolean)=>{
            if(tabSaved){
              this.router.navigate(['songs']);
            }
            this.tabSaveStatus = false;
          });
      }else {
        this.tabSavedSubscription = this.tabCreatorService.saveLyrics(this.tabCreationForm)
          .subscribe((tabSaved: boolean) =>{
            if(tabSaved){
              this.router.navigate(['songs']);
            }
            this.tabSaveStatus = false;
          });
      }
    }

  }

  getTabRequiredDetailsForm(): FormGroup<ISongTabCreationRequiredDetailsForm>{
    return <FormGroup<ISongTabCreationRequiredDetailsForm>>this.tabCreationForm.get('tabRequiredDetails')
  }

  // addSelectedChordInTab(selectedChord: Chord) {
  //   let chordName: string = `${selectedChord.chordRoot.rootName}${selectedChord.chordKey.keyName}`;
  //   if(this.lyricsTabTextArea.nativeElement.selectionStart || this.lyricsTabTextArea.nativeElement.selectionStart === 0){
  //     let startPos: number =  this.lyricsTabTextArea.nativeElement.selectionStart;
  //     let endPos: number = this.lyricsTabTextArea.nativeElement.selectionEnd;
  //     this.lyricsTabTextArea.nativeElement.value = this.lyricsTabTextArea.nativeElement.value.substring(0, startPos) +
  //       `[${chordName}]` + this.lyricsTabTextArea.nativeElement.value.substring(endPos,
  //         this.lyricsTabTextArea.nativeElement.value.length);
  //     this.lyricsTabTextArea.nativeElement.selectionStart = startPos + chordName.length;
  //     this.lyricsTabTextArea.nativeElement.selectionEnd = endPos + chordName.length;
  //   }else{
  //     this.lyricsTabTextArea.nativeElement.value += this.lyricsTabTextArea.nativeElement.value;
  //   }
  // }

  createTabTemplate(): string{
    let templateString: string = '';
    for (let word of this.LYRICS_TEMPLATE_WORDS) {
      templateString += `${word}`;
      for (let i = 0; i < this.LYRICS_TEMPLATE_WORDS_SEP_LINES; i++) {
        templateString += '\n';
      }
    }
    return templateString;
  }

  onGuitarTabSelected() {
    this.disableHarmonicaTabRelatedControls();
    this.enableGuitarTabRelatedControls();
    this.harmonicaTabSelected = false;
    this.lyricsSelected = false;
    // this.harmonicaTabTextAreaShown = false;
    this.guitarTabSelected = true;
  }

  onHarmonicaTabSelected() {
    this.disableGuitarTabRelatedControls();
    this.enableHarmonicaTabRelatedControls();
    this.guitarTabSelected = false;
    this.lyricsSelected = false;
    this.harmonicaTabSelected = true;
  }

  onLyricsSelected(){
    this.disableGuitarTabRelatedControls();
    this.disableHarmonicaTabRelatedControls();
    this.lyricsSelected = true;
    this.guitarTabSelected = false;
    this.harmonicaTabSelected = false;
    // this.harmonicaTabTextAreaShown = false;
  }

  // createHarmonicaTabInputTextArea() {
  //
  //   let lyricsTabValue: string = this.tabCreationForm.get('tabLyricsArea')?.value || '';
  //   let totalNumOfLinesInTab: number = this.tabCreatorService.calculateNumberOfLinesAfterWhiteSpaceRemoval(lyricsTabValue);
  //   let numOfWordsInLongestLine: number = this.tabCreatorService.calcLengthOfLongestLine(lyricsTabValue);
  //   let lines: Map<number, string> = this.tabCreatorService.getLyricsLines(lyricsTabValue);
  //
  //   this.numOfRowsHarmonicaInputArray = totalNumOfLinesInTab * 2;
  //   this.numOfColsHarmonicaInputArray = numOfWordsInLongestLine + 2;
  //   this.harmonicaLyricsLines = lines;
  //   this.harmonicaTabTextAreaShown = true;
  // }
  // onHarmonicTabBackBtnClicked() {
  //   this.harmonicaTabTextAreaShown = false;
  // }

  disableHarmonicaTabRelatedControls(){
    if(this.getTabRequiredDetailsForm()){
      this.resetArtistsAndTitleNameControls();
      this.tabCreationForm.get('harmonicaTabArea')?.disable();
      this.getTabRequiredDetailsForm().get('harmonicaType')?.disable();
      this.getTabRequiredDetailsForm().get('harmonicaKey')?.disable();
    }
  }

  enableHarmonicaTabRelatedControls(){
    if(this.getTabRequiredDetailsForm()){
      this.resetArtistsAndTitleNameControls();
      this.tabCreationForm.get('harmonicaTabArea')?.enable();
      this.getTabRequiredDetailsForm().get('harmonicaType')?.enable();
      this.getTabRequiredDetailsForm().get('harmonicaKey')?.enable();
    }
  }

  disableGuitarTabRelatedControls(){
    if(this.getTabRequiredDetailsForm()){
      this.resetArtistsAndTitleNameControls();
      this.getTabRequiredDetailsForm().get('tuningType')?.disable();
      this.getTabRequiredDetailsForm().get('capoFret')?.disable();
    }
  }

  enableGuitarTabRelatedControls(){
    if(this.getTabRequiredDetailsForm()){
      this.resetArtistsAndTitleNameControls();
      this.getTabRequiredDetailsForm().get('tuningType')?.enable();
      this.getTabRequiredDetailsForm().get('capoFret')?.enable();
    }
  }

  private resetRequiredDetailsFormValue(controlName: string){
    if(this.getTabRequiredDetailsForm()){
      this.getTabRequiredDetailsForm().get(controlName)?.reset();
    }
  }

  resetArtistsAndTitleNameControls(){
    this.resetRequiredDetailsFormValue('artistName');
    this.resetRequiredDetailsFormValue('otherArtistsName');
    this.resetRequiredDetailsFormValue('songTitle');
  }
}
