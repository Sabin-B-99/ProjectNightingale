import { Injectable } from '@angular/core';
import {
  IRoutine,
  ITopic,
  IRoutineForm,
  ITopicForm,
  IStrumPatterns,
  IChords, IChordChanges, IMetronomeValues, ITopicDTO
} from "../types/custom-interfaces";
import {FormArray, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, min, Observable, Subject} from "rxjs";
import {Chord} from "../models/chord-model/chord";
import {ChordRoot} from "../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../models/chord-model/chord-key-model/chord-key";
import {ChordChange} from "../models/chord-change-model/chord-change";


@Injectable({
  providedIn: 'root'
})
export class RoutineCreatorService {

  routineCreated: IRoutine = {
    title: '',
    topics: [],
    duration: 0
  };

  private routineIdForEdit: number;
  private editMode: boolean = false;

  private autoGenIdForRoutine: number = -1;

  private totalRoutineDuration: number = 0;
  constructor(private http: HttpClient) {
  }

  buildAndSaveRoutine(controls: IRoutineForm): Observable<boolean> {
    this.routineCreated.title = controls.routineTitle.value || '';
    let routineTopics: ITopic[] = this.buildTopics(controls.topics);
    this.routineCreated.duration = this.calculateRoutineTotalDuration(routineTopics);

    return  this.saveRoutine(this.routineCreated).
      pipe(map((routine: IRoutine) =>{
        let routineSaved: boolean = false;
        if(routine.id){
          this.autoGenIdForRoutine = routine.id;
          this.saveAllTopics(this.autoGenIdForRoutine, routineTopics);
          routineSaved = true;
        }
        return routineSaved;
      }));
  }

  private saveRoutine(routine: IRoutine){
    return  this.http.post<IRoutine>('http://localhost:8080/ProjectNightingale/api/practice/routines/', routine);
  }


  private saveAllTopics(routineId: number, topics: ITopic[]){
    if(routineId !== -1){
      for (let topic of topics){
        this.saveTopic(routineId, topic);
      }
    }
  }

  private saveTopic(routineId: number, topic: ITopic){
    let topicChords: IChords[] = topic.chords;
    let topicChordChanges: IChordChanges[] = topic.topicChordChanges;
    let topicStrumPatterns: IStrumPatterns[] = topic.strumPatterns;
    let topicMetronome: IMetronomeValues = topic.metronomes;

    let topicToSave: ITopicDTO = {title: topic.title,
      songTitle: topic.songTitle, timeDuration: topic.timeDuration, routineId: routineId};
      return this.http.post<ITopicDTO>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}/topics`,
        topicToSave).subscribe(
        (topic: ITopicDTO) =>{
          if(topic.id){
            this.saveTopicChords(topic.id, topicChords);
            this.saveTopicChordChanges(topic.id, topicChordChanges);
            this.saveTopicStrumPatterns(topic.id, topicStrumPatterns);
            this.saveTopicMetronomeValues(topic.id, topicMetronome);
          }
        }
      );
  }

  private saveTopicChords(topicId: number, chords: IChords[]){
    for (let chord of chords){
      this.saveTopicChord(topicId, chord);
    }
  }

  private saveTopicChord(topicId: number, chord: IChords){
    this.http.post<IChords>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chords`,
        chord).subscribe();
  }

  private saveTopicChordChanges(topicId: number, chordChanges: IChordChanges[]){
    for (let chordChange of chordChanges){
      let changeFrom: IChords = chordChange.changeFrom;
      let changeTo: IChords = chordChange.changeTo;
      let chordChangesChordsPrimaryKeys: IChords[] = [changeFrom, changeTo];
      this.saveTopicChordChange(topicId, chordChangesChordsPrimaryKeys);
    }
  }
  private saveTopicChordChange(topicId: number, chordChangeChordsPrimaryKeys: IChords[]){
    this.http.post<IChords[]>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chords-changes`,
    chordChangeChordsPrimaryKeys).subscribe();
  }

  private saveTopicMetronomeValues(topicId: number, metronome: IMetronomeValues){
    this.http.post<IMetronomeValues>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/metronomes`,
      metronome).subscribe();
  }

  private saveTopicStrumPatterns(topicId: number, strumPatterns: IStrumPatterns[]){
    for (let pattern of strumPatterns){
      this.saveTopicStrumPattern(topicId, pattern);
    }
  }
  private saveTopicStrumPattern(topicId: number, pattern: IStrumPatterns){
    this.http.post<IStrumPatterns>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/strum-patterns`,
      pattern).subscribe();
  }


  private buildTopics(topicsControls: FormArray<FormGroup<ITopicForm>>): ITopic[] {
    let topics: ITopic[] = [];

    for (let topicControlValue of topicsControls.value){

      topics.push(
        {
          title: topicControlValue.topicTitle || '',
          songTitle: topicControlValue.topicSongTitle || '',
          topicChordChanges: topicControlValue.topicChordChanges || [],
          chords: topicControlValue.topicChords || [],
          metronomes: topicControlValue.topicMetronome || {bpm: -1, beatsPerMeasure: -1},
          strumPatterns: this.buildStrumPatterns(topicControlValue.strumPatterns),
          timeDuration: this.buildTopicTime(topicControlValue.topicTime || '00:00:00')
        }
      )
    }
    return topics;
  }


  buildStrumPatterns(strumPatterns: (string|null)[] | undefined): IStrumPatterns[]{
    let addedStrumPatterns: IStrumPatterns[] = [];
    if(strumPatterns){
      for (let strumPattern of strumPatterns){
        addedStrumPatterns.push({
          pattern: strumPattern || ''
        })
      }
    }
    return addedStrumPatterns;
  }

  private buildTopicTime(topicTime: string): number {
    let hhMmSs: string[] =  topicTime.split(":");
    let topicDuration: number =  (((+hhMmSs[0]) * 60 * 60) + ((+hhMmSs[1]) * 60) + (+hhMmSs[2]));
    this.totalRoutineDuration += topicDuration;
    return topicDuration;
  }

  private calculateRoutineTotalDuration(topics: ITopic[]) {
    let totalDuration: number = 0;
    if(topics){
      for (let topic of topics){
        totalDuration += topic.timeDuration;
      }
    }
    return totalDuration;
  }

  public setRoutineIdForEdit(routineIdForEdit: number){
    this.routineIdForEdit = routineIdForEdit;
  }

  public setEditMode(editMode: boolean){
    this.editMode = editMode;
  }

  public getRoutineEditMode(){
    return this.editMode;
  }

  public getRoutineForEdit(){
    return this.routineIdForEdit;
  }


  public buildChordsFromIChords(chords: IChords[]): Chord[]{
    let chordModels: Chord[] = [];
    for (const chord of chords) {
      chordModels.push(this.buildChordModelFormIChord(chord));
    }
    return chordModels;
  }

  private buildChordModelFormIChord(chord: IChords): Chord{
    return new Chord(
      new ChordRoot(chord.chordRootOrder, chord.chordRootName),
      new ChordKey(chord.chordKeyId, chord.chordKeyName)
    )
  }

  buildChordsChangesFromIChordsChanges(chordChanges: IChordChanges[]) {
    let chordChangesModels: ChordChange[] = []
    for (const chordChange of chordChanges) {
      chordChangesModels.push(this.buildChordChangeModelFormIChordChange(chordChange));
    }
    return chordChangesModels;
  }

  private buildChordChangeModelFormIChordChange(chordChange: IChordChanges) {
    return new ChordChange(
      this.buildChordModelFormIChord(chordChange.changeFrom),
      this.buildChordModelFormIChord(chordChange.changeTo)
    );
  }

  buildTimeStringFromSecsVal(timeInSecs: number) {
    const hours: number = Math.floor(timeInSecs / 3600);
    const hoursInString: string = (hours < 10) ? `0${hours}`: `${hours}`;
    timeInSecs %= 3600;
    const minutes: number = Math.floor(timeInSecs / 60);
    const minutesInString: string = (minutes < 10) ? `0${minutes}`: `${minutes}`;
    const seconds: number = timeInSecs % 60;
    const secondsInString: string = (seconds < 10) ? `0${seconds}`: `${seconds}`;
    return `${hoursInString}:${minutesInString}:${secondsInString}`;
  }
}
