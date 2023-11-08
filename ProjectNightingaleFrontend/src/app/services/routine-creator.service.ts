import { Injectable } from '@angular/core';
import {
  IRoutine,
  ITopic,
  IRoutineForm,
  ITopicForm,
  IStrumPatterns,
  IChords, IChordChanges, IMetronomeValues, ITopicDTO, IChordSaveResponse
} from "../types/song-interfaces";
import {FormArray, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {defaultIfEmpty, forkJoin, map, Observable, Subject, switchMap} from "rxjs";
import {Chord} from "../models/chord-model/chord";
import {ChordRoot} from "../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../models/chord-model/chord-key-model/chord-key";
import {ChordChange} from "../models/chord-change-model/chord-change";


//TODO: Use Patch mappings to update rather than post
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

  private totalRoutineDuration: number = 0;
  constructor(private http: HttpClient) {
  }

  buildAndSaveRoutine(controls: IRoutineForm) : Observable<boolean>{
    if(this.editMode){
      this.routineCreated.id = this.routineIdForEdit;
    }
    this.routineCreated.title = controls.routineTitle.value || '';
    let routineTopics: ITopic[] = this.buildTopics(controls.topics);
    this.routineCreated.duration = this.calculateRoutineTotalDuration(routineTopics);

    return this.saveRoutine(this.routineCreated)
      .pipe(switchMap(savedRoutine => this.saveTopics(savedRoutine.id, routineTopics)
        .pipe(map(savedTopic =>{
          let saved: boolean = false;
          for (let value of savedTopic){
            saved = saved || value;
          }
          return saved;
        }))));
  }




  private saveRoutine(routine: IRoutine){
    return  this.http.post<IRoutine>('http://localhost:8080/ProjectNightingale/api/practice/routines/', routine);
  }

  saveTopics(routineId: number = -1, topics: ITopic[]){
    const savedTopics$: Observable<boolean>[] = [];
    topics.forEach(topic =>{
      savedTopics$.push(this.saveTopicAndItsComponents(routineId, topic));
    })
    return forkJoin(savedTopics$);
  }

  private saveTopicAndItsComponents(routineId: number = -1, topic: ITopic){
    let topicToSave: ITopicDTO = {title: topic.title,
      songTitle: topic.songTitle, timeDuration: topic.timeDuration, routineId: routineId};

    return this.http.post<ITopicDTO>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}/topics`,
        topicToSave).pipe(
          switchMap(savedTopic => this.saveTopicComponents(savedTopic.id, topic)
          ));
  }

  private saveTopicComponents(topicId: number = -1, topic: ITopic){
    let topicChords: IChords[] = topic.chords;
    let topicChordChanges: IChordChanges[] = topic.topicChordChanges;
    let topicStrumPatterns: IStrumPatterns[] = topic.strumPatterns;
    let topicMetronome: IMetronomeValues = topic.metronomes;

    return forkJoin({
      savedChords: this.saveTopicChords(topicId, topicChords),
      savedChordChanges: this.saveTopicChordChanges(topicId, topicChordChanges),
      savedStrumPatterns: this.saveTopicStrumPatterns(topicId, topicStrumPatterns),
      savedMetronomes: this.saveTopicMetronomeValue(topicId, topicMetronome)
    }).pipe(map(topicComponentsSaveStatues => {
      const chordSaved: boolean = topicComponentsSaveStatues.savedChords;
      const chordChangesSaved: boolean =  topicComponentsSaveStatues.savedChordChanges;
      const patternSaved: boolean = topicComponentsSaveStatues.savedStrumPatterns;
      const metronomeSaved: boolean = topicComponentsSaveStatues.savedMetronomes;
      return chordSaved || chordChangesSaved || patternSaved || metronomeSaved;
    }));
  }

  private saveTopicChords(topicId: number = -1, chordsToSave: IChords[]): Observable<boolean>{
    const savedChordsArray$: Observable<boolean>[] = [];
    chordsToSave.forEach( chordToSave =>{
      savedChordsArray$.push(this.saveTopicChord(topicId, chordToSave));
    })
    return forkJoin(savedChordsArray$)
      .pipe(defaultIfEmpty([]), map(chordSaveStatuses => {
        let chordsSaved: boolean = false;
        for (const saveStatus of chordSaveStatuses) {
          chordsSaved = chordsSaved || saveStatus;
        }
        return chordsSaved;
    }))
  }


  private  saveTopicChord(topicId: number = -1,chordToSave: IChords){
    return this.http.post<IChordSaveResponse>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chords`,
      chordToSave).pipe(map((savedChord) => {
        return savedChord.chords.length > 0;
    }));
  }

  private saveTopicChordChanges(topicId: number = -1, chordChangesToSave: IChordChanges[]): Observable<boolean>{
    const savedChordChangesArray$: Observable<boolean>[] = [];
    chordChangesToSave.forEach(chordChangeToSave =>{
          let changeFrom: IChords = chordChangeToSave.changeFrom;
          let changeTo: IChords = chordChangeToSave.changeTo;
          let chordChangesChordsPrimaryKeys: IChords[] = [changeFrom, changeTo];
          savedChordChangesArray$.push(this.saveTopicChordChange(topicId, chordChangesChordsPrimaryKeys));
    });
    return forkJoin(savedChordChangesArray$)
      .pipe(defaultIfEmpty([]), map(changesSaveStatuses => {
        let chordChangesSaved: boolean  = false;
        for (const saveStatus of changesSaveStatuses){
          chordChangesSaved = chordChangesSaved || saveStatus;
        }
        return chordChangesSaved;
      }));
  }

  private saveTopicChordChange(topicId: number = -1, chordChangeChordsPrimaryKeys: IChords[]){
    return this.http.post<IChordChanges>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chords-changes`,
    chordChangeChordsPrimaryKeys).pipe(map(savedChanges =>{
      return savedChanges.id !== -1;
    }));
  }


  private saveTopicMetronomeValue(topicId: number = -1, metronome: IMetronomeValues){
    return  this.http.post<IMetronomeValues>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/metronomes`,
      metronome).pipe(defaultIfEmpty({
      id: -1,
      bpm: 100,
      beatsPerMeasure: 4
    }), map(savedMetronome =>{
        return savedMetronome.id !== -1;
    }));
  }


  private saveTopicStrumPatterns(topicId: number = -1, patterns: IStrumPatterns[]){
    const savedStrumPatternsArray$: Observable<boolean>[] = [];
    patterns.forEach(pattern =>{
      savedStrumPatternsArray$.push(this.saveTopicStrumPattern(topicId, pattern));
    });
    return forkJoin(savedStrumPatternsArray$)
      .pipe(defaultIfEmpty([]), map(patternSaveStatuses => {
        let patternSaved: boolean = false;
        for (const saveStatus of patternSaveStatuses){
          patternSaved = patternSaved || saveStatus;
        }
        return patternSaved;
      }));
  }


  private saveTopicStrumPattern(topicId: number = -1, pattern: IStrumPatterns){
    return this.http.post<IStrumPatterns>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/strum-patterns`,
      pattern).pipe(map(savedPattern =>{
      return pattern.pattern.length > 0;
    }));
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
}
