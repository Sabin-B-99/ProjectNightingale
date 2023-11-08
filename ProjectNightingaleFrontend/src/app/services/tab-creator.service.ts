import {ElementRef, Injectable} from '@angular/core';
import {
  ICapoPositionDTO,
  IChordKey,
  IChordRoot,
  IDifficultyLevelsDTO,
  IGuitarOtherReqDetailsDTO,
  IGuitarTabLyricsDTO,
  IGuitarTuningTypesDTO,
  IHarmonicaKeyDTO,
  IHarmonicaOtherReqDetailsDTO,
  IHarmonicaTabLyricsDTO,
  IHarmonicaTypesDTO,
  IJoinPhraseDTO,
  ILyricsOnlyTabLyricsDTO,
  IOtherArtistDTO,
  ISongTabCreationForm,
  ISongTabDTO,
  TabType
} from "../types/song-interfaces";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabCreatorService{

validChordsChanged: Subject<string[]> = new Subject<string[]>();
private validChordRoots: string[] = [];
private validChordKeys: string[] = [];
private validChords: string[] = [];

  constructor(private http: HttpClient) {
  }



  public loadAllValidChordRoots(){
    this.http.get<IChordRoot[]>('http://localhost:8080/ProjectNightingale/api/chords/chord-roots')
      .pipe(map((chordRoots: IChordRoot[])=>{
        let chordRootNames: string[] = [];
        for (const chordRoot of chordRoots) {
          chordRootNames.push(chordRoot.rootName);
        }
        return chordRootNames;
      })).subscribe( (validChordRootNames: string[]) =>{
        this.validChordRoots = validChordRootNames;
        this.buildValidChords();
    });
  }

  public loadAllValidChordKeys(){
    this.http.get<IChordKey[]>('http://localhost:8080/ProjectNightingale/api/chords/chord-keys')
      .pipe(map((chordKeys: IChordKey[])=>{
        let chordKeyNames: string[] = [];
        for (const chordKey of chordKeys) {
          chordKeyNames.push(chordKey.keyName);
        }
        return chordKeyNames;
      })).subscribe( (validChordKeyNames: string[]) =>{
        this.validChordKeys = validChordKeyNames;
        this.buildValidChords();
    });
  }

  private buildValidChords(){
    if(this.validChords.length <= 0){
      for (const rootName of this.validChordRoots) {
        for (const keyName of this.validChordKeys) {
          if(keyName === "maj"){
            this.validChords.push(rootName.concat(''));
          }else if(keyName === "min"){
            this.validChords.push(rootName.concat('m'));
          }else{
            this.validChords.push(rootName.concat(keyName));
          }
        }
      }
      this.validChordsChanged.next(this.validChords.slice());
    }
  }

  public loadGuitarTunings(): Observable<string[]>{
    return  this.http.get<IGuitarTuningTypesDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/guitar-tunings/')
      .pipe(map( (tunings: IGuitarTuningTypesDTO[]) =>{
        let tuningTypes: string[] = [];
        for (const tuningType of tunings) {
          tuningTypes.push(tuningType.tuning);
        }
        return tuningTypes;
      }));
  }


  public loadDifficultyLevels(): Observable<string[]>{
    return this.http.get<IDifficultyLevelsDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/difficulties/')
      .pipe(map((difficulties: IDifficultyLevelsDTO[]) =>{
        let difficultyLevels: string[] = [];
        for (const difficultyType of difficulties) {
          difficultyLevels.push(difficultyType.difficulty);
        }
        return difficultyLevels;
      }));
  }

  public loadHarmonicaTypes(): Observable<string[]>{
    return this.http.get<IHarmonicaTypesDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/harmonica-types/')
      .pipe(map((harmonicaTypes: IHarmonicaTypesDTO[]) =>{
        let harmonicas: string[] = [];
        for (const harmonica of harmonicaTypes) {
          harmonicas.push(harmonica.harmonicaType);
        }
        return harmonicas;
      }));
  }

  public loadHarmonicaKeys(): Observable<string[]>{
    return this.http.get<IHarmonicaKeyDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/harmonica-keys/')
      .pipe(map( (harmonicaKeys: IHarmonicaKeyDTO[]) =>{
        let keys: string[] = [];
        for (const key of harmonicaKeys) {
          keys.push(key.harmonicaKey);
        }
        return keys;
      }));
  }

  public loadCapoPositions(): Observable<string[]>{
    return this.http.get<ICapoPositionDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/capo-positions/')
      .pipe(map((capoPosns: ICapoPositionDTO[]) =>{
        let capoPositions: string[] = [];
        for (const capoPosition of capoPosns) {
          capoPositions.push(capoPosition.capoPosition);
        }
        return capoPositions;
      }));
  }

  public loadJoinPhrases(): Observable<string[]>{
    return this.http.get<IJoinPhraseDTO[]>('http://localhost:8080/ProjectNightingale/api/tabs/join-phrases/')
      .pipe(map( (joinPhrases: IJoinPhraseDTO[]) =>{
        let phrases: string[] = [];
        for (const joinPhrase of joinPhrases) {
          phrases.push(joinPhrase.joinPhrase);
        }
        return phrases;
      }));
  }



  public setCursorAt(textArea: ElementRef<HTMLTextAreaElement>, lineNo:number, col: number){
    let startPos: number = textArea.nativeElement.selectionStart;

    let textAreaLinesTillCurrentCursorPos: string[] = textArea.nativeElement.value.substring(0, startPos)
      .split('\n');

    let cursorCurrentRow: number = textAreaLinesTillCurrentCursorPos.length;

    if(cursorCurrentRow - lineNo > 1){
      textArea.nativeElement.selectionStart =
        this.findNumberOfCharacters(textAreaLinesTillCurrentCursorPos.slice(0, lineNo-1)) + 1;
      textArea.nativeElement.selectionEnd = textArea.nativeElement.selectionStart + col;
    }else if (cursorCurrentRow - lineNo < 1){
      this.addLineBreaks(textArea, lineNo - cursorCurrentRow);
      textArea.nativeElement.selectionEnd = textArea.nativeElement.selectionStart + col;
    }else{
      textArea.nativeElement.selectionStart = col;
      textArea.nativeElement.selectionEnd = col;
    }
  }

  public addLineBreaks(textAreaElem: ElementRef<HTMLTextAreaElement>, numOfBreaks: number){
    for (let i = 0; i < numOfBreaks; i++) {
      textAreaElem.nativeElement.value += '\n';
    }
  }

  // public appendLineBreaks(strToAppendTo: string, numOfBreaks: number){
  //   let stringAfterAppendingLineBreaks: string = strToAppendTo;
  //   for (let i = 0; i < numOfBreaks; i++) {
  //     stringAfterAppendingLineBreaks += '\n';
  //   }
  //   return stringAfterAppendingLineBreaks;
  // }

  public findNumberOfCharacters(lines: string[]): number{
    let totalNumberOfChars: number = 0;
    for (const line of lines) {
      totalNumberOfChars += line.length;
    }
    return totalNumberOfChars;
  }

  // getLyricsLines(tabTextAreaValue: string): Map<number,string>{
  //   let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
  //   let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
  //   let lines: Map<number, string> = new Map<number, string>();
  //   let lineNo: number = 0;
  //   for (const line of tabLines) {
  //     lines.set(lineNo, line);
  //     lineNo++;
  //   }
  //   return lines;
  // }

  // calcLengthOfLongestLine(tabTextAreaValue: string): number{
  //   let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
  //   let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
  //   let longestLen: number = 0;
  //   for (const tabLine of tabLines) {
  //     let lenOfCurrentLine: number = this.calculateTotalWordsInALine(tabLine);
  //     if(lenOfCurrentLine > longestLen){
  //       longestLen = lenOfCurrentLine;
  //     }
  //   }
  //   return longestLen;
  // }

  // calculateNumberOfLinesAfterWhiteSpaceRemoval(tabTextAreaValue: string): number{
  //   let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
  //   let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
  //   return tabLines.length;
  // }

  // public calculateWordsInLyricsTab(tabTextAreaValue: string): number{
  //   let texAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
  //   let totalWords: number = 0
  //   let tabLines: string[] =  texAfterWhiteSpaceRemoval.split('\n');
  //   for (const line of tabLines) {
  //       totalWords += this.calculateTotalWordsInALine(line);
  //   }
  //   return totalWords;
  // }

  // private removeWordsInsideParenthesis(line: string): string{
  //   return line.replace(/\s*\([^()]*\)$/, '');
  // }
  // private calculateTotalWordsInALine(line: string): number {
  //   return line.split(new RegExp(/\b\s+/)).length;
  // }
  // private removeBlankLinesAfterRemovingTextsInParenthesis(textAreaValue: string): string{
  //   let lines: string[] = textAreaValue.split('\n');
  //   let remLinesAfterRemoval: string[] = [];
  //   for (const line of lines) {
  //     let lineAfterRemWordsInParenthesis = this.removeWordsInsideParenthesis(line);
  //     if(lineAfterRemWordsInParenthesis.trim() !== ""){
  //       remLinesAfterRemoval.push(lineAfterRemWordsInParenthesis);
  //     }
  //   }
  //   return remLinesAfterRemoval.join('\n');
  // }

  // getWordsInLine(line: string): string[] {
  //   return line.split(/\b\s+/);
  // }


  // extractChordsFromLyrics(lyrics: string): string[] {
  //   let extractedChords: string[] = [];
  //   let extractedChord: string = '';
  //   let text: string[] = lyrics.split('[');
  //   for (let i = 0; i < text.length; i++) {
  //     extractedChord = text[i].split(']')[0];
  //     if(extractedChord !== text[i] && extractedChord.trim().length  > 0){
  //       extractedChords.push(extractedChord);
  //     }
  //   }
  //   return extractedChords;
  // }


  private  extractTabSongDetails(tabCreationForm: FormGroup<ISongTabCreationForm>): ISongTabDTO{
    return {
      songTitle: tabCreationForm.value.tabRequiredDetails?.songTitle || '',
      artistName: tabCreationForm.value.tabRequiredDetails?.artistName || '',
    };
  }

  private saveTabSongDetails(songDetails: ISongTabDTO){
    return this.http.post<ISongTabDTO>('http://localhost:8080/ProjectNightingale/api/tabs/songs/', songDetails)
      .pipe(map((tabSong: ISongTabDTO) =>{
        return tabSong.id;
      }));
  }

  private extractOtherArtistsName(tabCreationForm: FormGroup<ISongTabCreationForm>): IOtherArtistDTO[]{
    let otherArtists: IOtherArtistDTO[] = [];
    if(tabCreationForm.value.tabRequiredDetails?.otherArtistsNames){
      for (const otherArtistName of tabCreationForm.value.tabRequiredDetails.otherArtistsNames) {
        otherArtists.push({
          otherArtistName: otherArtistName || '',
          joinWord: tabCreationForm.value.tabRequiredDetails.otherArtistsJoinPhrase || ''
        })
      }
    }
    return otherArtists;
  }

  private saveOtherArtistsName(songTabId: string,otherArtists: IOtherArtistDTO[]){
    if(otherArtists.length > 0){
      for (const otherArtist of otherArtists) {
        this.http.post<ISongTabDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/other-artists`, otherArtist)
          .subscribe()
      }
    }
  }

  private extractHarmonicaOtherReqDetails(tabCreationForm: FormGroup<ISongTabCreationForm>): IHarmonicaOtherReqDetailsDTO{
    return {
      harmonicaType: tabCreationForm.value.tabRequiredDetails?.harmonicaType || '',
      harmonicaKey: tabCreationForm.value.tabRequiredDetails?.harmonicaKey || '',
      difficulty: tabCreationForm.value.tabRequiredDetails?.difficulty || ''
    }
  }

  private saveHarmonicaOtherReqDetails(songTabId: string, harmonicaOtherReqDetails: IHarmonicaOtherReqDetailsDTO){
    this.http.post<IHarmonicaOtherReqDetailsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/harmonica-other-req-details`,
      harmonicaOtherReqDetails).subscribe();
  }
  private extractGuitarOtherReqDetails(tabCreationForm: FormGroup<ISongTabCreationForm>): IGuitarOtherReqDetailsDTO{
    return {
      tuningType: tabCreationForm.value.tabRequiredDetails?.tuningType || '',
      capoPosition: tabCreationForm.value.tabRequiredDetails?.capoFret || '',
      difficulty: tabCreationForm.value.tabRequiredDetails?.difficulty || ''
    }
  }

  private saveGuitarOtherReqDetails(songTabId: string, guitarOtherReqDetails: IGuitarOtherReqDetailsDTO){
    this.http.post<IGuitarOtherReqDetailsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/guitar-other-req-details`,
      guitarOtherReqDetails).subscribe();
  }

  private extractGuitarTabLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>): IGuitarTabLyricsDTO{
    return {
      lyrics: tabCreationForm.value.tabLyricsArea || ''
    }
  }

  private saveGuitarTabLyrics(songTabId: string, guitarTabLyrics: IGuitarTabLyricsDTO){
    this.http.post<IGuitarTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/guitar-tab-lyrics`,
      guitarTabLyrics).subscribe();
  }
  private extractLyricsOnlyTabLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>): ILyricsOnlyTabLyricsDTO{
    return {
      lyrics: tabCreationForm.value.tabLyricsArea || ''
    }
  }

  private saveLyricsOnlyTabLyrics(songTabId: string, lyrics: ILyricsOnlyTabLyricsDTO){
    this.http.post<ILyricsOnlyTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/lyrics-only-tab-lyrics`,
      lyrics).subscribe();
  }

  private extractHarmonicaTabLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>): IHarmonicaTabLyricsDTO{
    return {
      lyrics: tabCreationForm.value.tabLyricsArea || ''
    }
  }

  // private extractHarmonicaTabLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>): IHarmonicaTabLyricsDTO[]{
  //   let harmonicaTabCells: IHarmonicaTabLyricsDTO[] = [];
  //   if(tabCreationForm.value.harmonicaTabArea){
  //     for (const cell of tabCreationForm.value.harmonicaTabArea) {
  //       harmonicaTabCells.push({
  //         tabCellRowNo: cell.cellNum.row,
  //         tabCellColNo: cell.cellNum.col,
  //         tabCellValue: cell.value
  //       })
  //     }
  //   }
  //   return harmonicaTabCells;
  // }

  // private saveHarmonicaTabLyrics(songTabId: string, harmonicaTabLyrics: IHarmonicaTabLyricsDTO[]){
  //   if(harmonicaTabLyrics.length > 0){
  //     for (const cell of harmonicaTabLyrics) {
  //       console.log(cell);
  //       this.http.post<IHarmonicaTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/harmonica-tab-lyrics`,
  //         cell).subscribe();
  //     }
  //   }
  // }


  private saveHarmonicaTabLyrics(songTabId: string, harmonicaTabLyrics: IHarmonicaTabLyricsDTO){
    this.http.post<IHarmonicaTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/harmonica-tab-lyrics`,
      harmonicaTabLyrics).subscribe();
  }
  saveGuitarTab(tabCreationForm: FormGroup<ISongTabCreationForm>): Observable<boolean> {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    tabSongDetails.tabType = TabType.guitar;

    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const tabGuitarOtherReqDetails: IGuitarOtherReqDetailsDTO = this.extractGuitarOtherReqDetails(tabCreationForm);
    const tabLyrics: IGuitarTabLyricsDTO = this.extractGuitarTabLyrics(tabCreationForm);

    return this.saveTabSongDetails(tabSongDetails)
      .pipe(map((id: string | undefined)=>{
        let guitarTabSaved: boolean = false;
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveGuitarOtherReqDetails(id, tabGuitarOtherReqDetails);
          this.saveGuitarTabLyrics(id, tabLyrics);
          guitarTabSaved = true;
        }
        return guitarTabSaved;
      }
      ));

  }

  saveHarmonicaTab(tabCreationForm: FormGroup<ISongTabCreationForm>): Observable<boolean> {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    tabSongDetails.tabType = TabType.harmonica;

    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const tabHarmonicaOtherReqDetails: IHarmonicaOtherReqDetailsDTO = this.extractHarmonicaOtherReqDetails(tabCreationForm);
    // const tabLyrics: IHarmonicaTabLyricsDTO[] = this.extractHarmonicaTabLyrics(tabCreationForm);
    const tabLyrics: IHarmonicaTabLyricsDTO = this.extractHarmonicaTabLyrics(tabCreationForm);

    return this.saveTabSongDetails(tabSongDetails)
      .pipe(map((id: string | undefined) =>{
        let harmonicaTabSaved: boolean = false;
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveHarmonicaOtherReqDetails(id, tabHarmonicaOtherReqDetails);
          this.saveHarmonicaTabLyrics(id, tabLyrics);
          harmonicaTabSaved = true;
        }
        return harmonicaTabSaved;
      }));
  }

  saveLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>):Observable<boolean> {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    tabSongDetails.tabType = TabType.lyrics

    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const lyrics: ILyricsOnlyTabLyricsDTO = this.extractLyricsOnlyTabLyrics(tabCreationForm);

    return this.saveTabSongDetails(tabSongDetails)
      .pipe(map((id: string|undefined) =>{
        let lyricsSaved: boolean = false;
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveLyricsOnlyTabLyrics(id, lyrics);
          lyricsSaved = true;
        }
        return lyricsSaved;
      }));
  }

}
