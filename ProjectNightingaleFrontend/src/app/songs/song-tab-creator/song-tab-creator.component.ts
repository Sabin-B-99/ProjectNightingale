import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabRequiredDetailsComponent} from "./tab-required-details/tab-required-details.component";
import {TabCreatorService} from "../../services/tab-creator.service";
import {ISongTabCreationForm, ITableFormCellValue} from "../../types/custom-interfaces";
import {lyricsBracketsValidation} from "../../validators/tab-lyrics-text-brackets-validator.directive";
import {chordsValidator} from "../../validators/valid-chords-validator.directive";

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
  readonly LYRICS_AREA_NO_OF_COLS: number = 30;

  guitarTabSelected: boolean = true;
  harmonicaTabSelected: boolean = false;
  harmonicaTabTextAreaShown: boolean = false;
  lyricsSelected: boolean = false;

  tabCreationForm: FormGroup<ISongTabCreationForm>;


  numOfRowsHarmonicaInputArray: number;
  numOfColsHarmonicaInputArray: number;
  harmonicaLyricsLines: Map<number, string>;

  validChords: string[] = [];

  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit(): void {
    this.validChords = this.tabCreatorService.getValidChords();

    this.tabCreationForm = new FormGroup<ISongTabCreationForm>({
      'tabRequiredDetails': TabRequiredDetailsComponent.getTabRequiredDetailForm(),
      'tabLyricsArea': new FormControl<string>('', [Validators.required,
        lyricsBracketsValidation(), chordsValidator(this.validChords.slice())]),
      'harmonicaTabArea': new FormControl<ITableFormCellValue[]>([])
    });
  }

  ngAfterViewInit() {
    this.tabCreatorService.setCursorAt(this.lyricsTabTextArea,2,0);
  }

  ngOnDestroy() {
  }

  onTabCreationFormSubmitted(){
    let lyrics: string = this.tabCreationForm.get('tabLyricsArea')?.value || '';
  }

  getTabRequiredDetailsForm(): FormGroup{
    return <FormGroup>this.tabCreationForm.get('tabRequiredDetails')
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
    this.harmonicaTabSelected = false;
    this.lyricsSelected = false;
    this.harmonicaTabTextAreaShown = false;
    this.guitarTabSelected = true;
  }

  onHarmonicaTabSelected() {
    this.guitarTabSelected = false;
    this.lyricsSelected = false;
    this.harmonicaTabSelected = true;
  }

  onLyricsSelected(){
    this.lyricsSelected = true;
    this.guitarTabSelected = false;
    this.harmonicaTabSelected = false;
    this.harmonicaTabTextAreaShown = false;
  }

  createHarmonicaTabInputTextArea() {

    let lyricsTabValue: string = this.tabCreationForm.get('tabLyricsArea')?.value || '';
    let totalNumOfLinesInTab: number = this.tabCreatorService.calculateNumberOfLinesAfterWhiteSpaceRemoval(lyricsTabValue);
    let numOfWordsInLongestLine: number = this.tabCreatorService.calcLengthOfLongestLine(lyricsTabValue);
    let lines: Map<number, string> = this.tabCreatorService.getLyricsLines(lyricsTabValue);

    this.numOfRowsHarmonicaInputArray = totalNumOfLinesInTab * 2;
    this.numOfColsHarmonicaInputArray = numOfWordsInLongestLine + 2;
    this.harmonicaLyricsLines = lines;
    this.harmonicaTabTextAreaShown = true;
  }
  onHarmonicTabBackBtnClicked() {
    this.harmonicaTabTextAreaShown = false;
  }


}
