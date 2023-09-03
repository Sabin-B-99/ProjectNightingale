import {ElementRef, Injectable} from '@angular/core';
import {
  IGuitarOtherReqDetailsDTO, IGuitarTabLyricsDTO,
  IHarmonicaOtherReqDetailsDTO, IHarmonicaTabLyricsDTO, ILyricsOnlyTabLyricsDTO,
  IOtherArtistDTO,
  ISongTabCreationForm,
  ISongTabDTO
} from "../types/custom-interfaces";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TabCreatorService {

  private difficultyLevels: string[] = ['Easy', 'Intermediate', 'Hard']
  private otherArtistJoinPhrase: string[] = ['feat.', 'with'];
  private tuningTypes: string[] = [
    'Standard',
    'Not Standard',
    'Tune 3',
    'Tune 4'
  ]
  private harmonicaTypes: string[] = [
    'Diatonic',
    'Chromatic'
  ]
  private harmonicaKeyTypes: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F'
  ]

  private capos: string[] = [
    '1st fret', '2nd fret', '3rd fret', '4th fret'
  ];

  private validChords: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'Am', 'Bm', 'Cm', 'Dm', 'Em', 'Fm', 'Gm',
    'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb',
    'A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'
  ]

  constructor(private http: HttpClient) { }

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

  public appendLineBreaks(strToAppendTo: string, numOfBreaks: number){
    let stringAfterAppendingLineBreaks: string = strToAppendTo;
    for (let i = 0; i < numOfBreaks; i++) {
      stringAfterAppendingLineBreaks += '\n';
    }
    return stringAfterAppendingLineBreaks;
  }

  public findNumberOfCharacters(lines: string[]): number{
    let totalNumberOfChars: number = 0;
    for (const line of lines) {
      totalNumberOfChars += line.length;
    }
    return totalNumberOfChars;
  }

  getLyricsLines(tabTextAreaValue: string): Map<number,string>{
    let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
    let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
    let lines: Map<number, string> = new Map<number, string>();
    let lineNo: number = 0;
    for (const line of tabLines) {
      lines.set(lineNo, line);
      lineNo++;
    }
    return lines;
  }

  calcLengthOfLongestLine(tabTextAreaValue: string): number{
    let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
    let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
    let longestLen: number = 0;
    for (const tabLine of tabLines) {
      let lenOfCurrentLine: number = this.calculateTotalWordsInALine(tabLine);
      if(lenOfCurrentLine > longestLen){
        longestLen = lenOfCurrentLine;
      }
    }
    return longestLen;
  }

  calculateNumberOfLinesAfterWhiteSpaceRemoval(tabTextAreaValue: string): number{
    let textAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
    let tabLines: string[] = textAfterWhiteSpaceRemoval.split('\n');
    return tabLines.length;
  }

  // public calculateWordsInLyricsTab(tabTextAreaValue: string): number{
  //   let texAfterWhiteSpaceRemoval: string = this.removeBlankLinesAfterRemovingTextsInParenthesis(tabTextAreaValue);
  //   let totalWords: number = 0
  //   let tabLines: string[] =  texAfterWhiteSpaceRemoval.split('\n');
  //   for (const line of tabLines) {
  //       totalWords += this.calculateTotalWordsInALine(line);
  //   }
  //   return totalWords;
  // }

  private removeWordsInsideParenthesis(line: string): string{
    return line.replace(/\s*\([^()]*\)$/, '');
  }
  private calculateTotalWordsInALine(line: string): number {
    return line.split(new RegExp(/\b\s+/)).length;
  }
  private removeBlankLinesAfterRemovingTextsInParenthesis(textAreaValue: string): string{
    let lines: string[] = textAreaValue.split('\n');
    let remLinesAfterRemoval: string[] = [];
    for (const line of lines) {
      let lineAfterRemWordsInParenthesis = this.removeWordsInsideParenthesis(line);
      if(lineAfterRemWordsInParenthesis.trim() !== ""){
        remLinesAfterRemoval.push(lineAfterRemWordsInParenthesis);
      }
    }
    return remLinesAfterRemoval.join('\n');
  }

  // getWordsInLine(line: string): string[] {
  //   return line.split(/\b\s+/);
  // }


  getOtherArtistsJoinPhrase(): string[]{
    return this.otherArtistJoinPhrase.slice();
  }

  getTuningTypes(): string[]{
    return this.tuningTypes.slice();
  }

  getHarmonicaTypes(): string[]{
    return this.harmonicaTypes.slice();
  }
  getDifficultyLevels(): string[]{
    return this.difficultyLevels.slice();
  }

  getHarmonicaKeyTypes(): string[]{
    return this.harmonicaKeyTypes.slice();
  }

  getCapos(): string[] {
    return this.capos.slice();
  }

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

  getValidChords() {
    return this.validChords;
  }
  private  extractTabSongDetails(tabCreationForm: FormGroup<ISongTabCreationForm>): ISongTabDTO{
    return {
      id: null,
      tabSongTitle: tabCreationForm.value.tabRequiredDetails?.songTitle || '',
      songArtistName: tabCreationForm.value.tabRequiredDetails?.artistName || ''
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
          otherJoinWord: tabCreationForm.value.tabRequiredDetails.otherArtistsJoinPhrase || ''
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
      guitarTabLyrics)
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

  private extractHarmonicaTabLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>): IHarmonicaTabLyricsDTO[]{
    let harmonicaTabCells: IHarmonicaTabLyricsDTO[] = [];
    if(tabCreationForm.value.harmonicaTabArea){
      for (const cell of tabCreationForm.value.harmonicaTabArea) {
        harmonicaTabCells.push({
          cellRowNo: cell.cellNum.row,
          cellColNo: cell.cellNum.col,
          cellValue: cell.value
        })
      }
    }
    return harmonicaTabCells;
  }

  private saveHarmonicaTabLyrics(songTabId: string, harmonicaTabLyrics: IHarmonicaTabLyricsDTO[]){
    if(harmonicaTabLyrics.length > 0){
      for (const cell of harmonicaTabLyrics) {
        this.http.post<IHarmonicaTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${songTabId}/harmonica-tab-lyrics`,
          harmonicaTabLyrics).subscribe();
      }
    }
  }
  saveGuitarTab(tabCreationForm: FormGroup<ISongTabCreationForm>) {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const tabGuitarOtherReqDetails: IGuitarOtherReqDetailsDTO = this.extractGuitarOtherReqDetails(tabCreationForm);
    const tabLyrics: IGuitarTabLyricsDTO = this.extractGuitarTabLyrics(tabCreationForm);

    this.saveTabSongDetails(tabSongDetails)
      .subscribe((id: string | null)=>{
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveGuitarOtherReqDetails(id, tabGuitarOtherReqDetails);
          this.saveGuitarTabLyrics(id, tabLyrics);
        }
      }
    );

  }

  saveHarmonicaTab(tabCreationForm: FormGroup<ISongTabCreationForm>) {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const tabHarmonicaOtherReqDetails: IHarmonicaOtherReqDetailsDTO = this.extractHarmonicaOtherReqDetails(tabCreationForm);
    const tabLyrics: IHarmonicaTabLyricsDTO[] = this.extractHarmonicaTabLyrics(tabCreationForm);

    this.saveTabSongDetails(tabSongDetails)
      .subscribe((id: string|null) =>{
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveHarmonicaOtherReqDetails(id, tabHarmonicaOtherReqDetails);
          this.saveHarmonicaTabLyrics(id, tabLyrics);
        }
      })
  }

  saveLyrics(tabCreationForm: FormGroup<ISongTabCreationForm>) {
    const tabSongDetails: ISongTabDTO = this.extractTabSongDetails(tabCreationForm);
    const tabOtherArtists: IOtherArtistDTO[] = this.extractOtherArtistsName(tabCreationForm);
    const lyrics: ILyricsOnlyTabLyricsDTO = this.extractLyricsOnlyTabLyrics(tabCreationForm);

    this.saveTabSongDetails(tabSongDetails)
      .subscribe((id: string|null) =>{
        if(id){
          this.saveOtherArtistsName(id, tabOtherArtists);
          this.saveLyricsOnlyTabLyrics(id, lyrics);
        }
      })
  }

}
