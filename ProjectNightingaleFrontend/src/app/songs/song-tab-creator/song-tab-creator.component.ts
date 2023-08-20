import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {TabRequiredDetailsComponent} from "./tab-required-details/tab-required-details.component";
import {TabCreatorService} from "../../services/tab-creator.service";
import {Subscription} from "rxjs";
import {Chord} from "../../models/chord-model/chord";

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

  tabCreationForm: FormGroup;


  selectedChordsForTabSubscription: Subscription;
  selectedChordsForTab: Chord[] = [];


  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit(): void {
    this.tabCreationForm = new FormGroup({
      'tabRequiredDetails': TabRequiredDetailsComponent.getTabRequiredDetailForm(),
      'tabLyricsArea': new FormControl<string>('', [Validators.required]),
      'harmonicaTabArea': new FormArray<FormArray<FormControl<string | null>>>([])
    });

    this.selectedChordsForTabSubscription = this.tabCreatorService.selectedChordsChangedEvenEmitter
      .subscribe(
        (selectedChords: Chord[]) =>{
          this.selectedChordsForTab = selectedChords
        }
      );

  }

  ngAfterViewInit() {
    this.createTabTemplate();
    this.tabCreatorService.setCursorAt(this.lyricsTabTextArea,2,0);
  }

  ngOnDestroy() {
    if(this.selectedChordsForTabSubscription){
      this.selectedChordsForTabSubscription.unsubscribe();
    }
  }

  onTabCreationFormSubmitted(){
  }

  getTabRequiredDetailsForm(): FormGroup{
    return <FormGroup>this.tabCreationForm.get('tabRequiredDetails')
  }

  addSelectedChordInTab(selectedChord: Chord) {
    let chordName: string = `${selectedChord.chordRoot.rootName}${selectedChord.chordKey.keyName}`;
    if(this.lyricsTabTextArea.nativeElement.selectionStart || this.lyricsTabTextArea.nativeElement.selectionStart === 0){
      let startPos: number =  this.lyricsTabTextArea.nativeElement.selectionStart;
      let endPos: number = this.lyricsTabTextArea.nativeElement.selectionEnd;
      this.lyricsTabTextArea.nativeElement.value = this.lyricsTabTextArea.nativeElement.value.substring(0, startPos) +
        `[${chordName}]` + this.lyricsTabTextArea.nativeElement.value.substring(endPos,
          this.lyricsTabTextArea.nativeElement.value.length);
      this.lyricsTabTextArea.nativeElement.selectionStart = startPos + chordName.length;
      this.lyricsTabTextArea.nativeElement.selectionEnd = endPos + chordName.length;
    }else{
      this.lyricsTabTextArea.nativeElement.value += this.lyricsTabTextArea.nativeElement.value;
    }
  }

  private createTabTemplate(){
    for (let word of this.LYRICS_TEMPLATE_WORDS) {
      this.lyricsTabTextArea.nativeElement.value += `${word}`;
      this.tabCreatorService.addLineBreaks(this.lyricsTabTextArea, this.LYRICS_TEMPLATE_WORDS_SEP_LINES);
    }
  }

  onGuitarTabSelected() {
    this.harmonicaTabSelected = false;
    this.harmonicaTabTextAreaShown = false;
    this.guitarTabSelected = true;
  }

  onHarmonicaTabSelected() {
    this.guitarTabSelected = false;
    this.harmonicaTabSelected = true;
  }

  createHarmonicaTabInputTextArea() {
    this.harmonicaTabTextAreaShown = true;

    let lyricsTabValue: string = this.tabCreationForm.get('tabLyricsArea')?.value;
    let totalNumOfLinesInTab: number = this.tabCreatorService.calculateNumberOfLinesAfterWhiteSpaceRemoval(lyricsTabValue);
    let numOfWordsInLongestLine: number = this.tabCreatorService.calcLengthOfLongestLine(lyricsTabValue);
    let lines: Map<number, string> = this.tabCreatorService.getLyricsLines(lyricsTabValue);

    this.addHarmonicaTabInputRow(totalNumOfLinesInTab * 2,
      numOfWordsInLongestLine + 2, lines);
  }

  private addHarmonicaTabInputRow(numOfRowsToAdd: number, numOfColInEachRow: number, lyricLines: Map<number, string>){
    let harmonicaTabInput: FormArray<FormArray<FormControl<string | null>>> =
      (<FormArray<FormArray<FormControl<string | null>>>>this.tabCreationForm.get('harmonicaTabArea'));

    let harmonicaTabInputRowInputElems: FormArray<FormControl<string | null>>;

    for (let i = 0; i < numOfRowsToAdd; i++) {
      harmonicaTabInput.push(
        new FormArray<FormControl<string | null>>([])
      );
      harmonicaTabInputRowInputElems = harmonicaTabInput.at(i);
      for (let j = 0; j < numOfColInEachRow; j++) {
        harmonicaTabInputRowInputElems.push(new FormControl());
        if(i % 2 !== 0){
          harmonicaTabInputRowInputElems.disable();
        }
      }
    }
    this.initializeCellsWithLyrics(harmonicaTabInput ,lyricLines);
  }

  private initializeCellsWithLyrics(harmonicaTabInput: FormArray<FormArray<FormControl<string | null>>>,
                                    lines: Map<number, string>){
    let totalNumOfLinesInTab: number = lines.size;
    let currentLine: string;
    let wordsInCurrentLine: string[];
    let harmonicaTabInputRowInputElems: FormArray<FormControl<string | null>>;
    let currentInputElement: FormControl<string|null>;

    let j: number;
    for (let i = 0; i < totalNumOfLinesInTab; i++) {
      harmonicaTabInputRowInputElems = harmonicaTabInput.at(((i + 1) * 2) - 1);
      currentLine = lines.get(i) || '';
      j = 0;
      if(currentLine.trim().length > 0 && harmonicaTabInputRowInputElems){
        wordsInCurrentLine  = this.tabCreatorService.getWordsInLine(currentLine);
        for (const word of wordsInCurrentLine) {
          currentInputElement = harmonicaTabInputRowInputElems.at(j+1);
          if(currentInputElement){
            currentInputElement.setValue(word);
            currentInputElement.disable();
          }
          j++;
        }
      }
    }
  }

  get harmonicaTabInputRow(): FormArray<FormArray<FormControl<string>>>{
    return (<FormArray<FormArray<FormControl<string>>>>this.tabCreationForm.get('harmonicaTabArea'));
  }

  onHarmonicTabBackBtnClicked() {
    this.harmonicaTabTextAreaShown = false;
  }
}
