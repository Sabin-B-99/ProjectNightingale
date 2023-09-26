import {Injectable} from '@angular/core';
import {Routine} from "../models/routine-model/routine";
import {HttpClient} from "@angular/common/http";
import {
  IChordChanges, IChordChangesDTO,
  IChordDTO,
  IChords,
  IMetronomeValues,
  IRoutine,
  IStrumPatterns,
  ITopic
} from "../types/custom-interfaces";
import {forkJoin, map, Observable,  Subject,  switchMap} from "rxjs";
import {Topic} from "../models/topic-model/topic";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private selectedRoutine: Routine;
  selectedRoutineChanged: Subject<Routine> = new Subject<Routine>();

  public topicsToEdit: ITopic[] = [];
  constructor(private http: HttpClient) {
  }

  public loadUserRoutines(): Observable<Routine[]>{
    return  this.http.get<IRoutine[]>('http://localhost:8080/ProjectNightingale/api/practice/routines/')
      .pipe(map( (routines: IRoutine[]) => {
        const loadedRoutines :Routine[] = [];
        for (let routine of routines){
          loadedRoutines.push(new Routine(routine.id,routine.title,routine.duration));
        }
        return loadedRoutines;
      }));
  }

  public loadSelectedRoutineAndItsTopicsByRoutineId(routineId: number){
    this.loadRoutineById(routineId)
      .subscribe((routine: IRoutine) =>{
        if(!this.selectedRoutine){
          this.selectedRoutine = new Routine(routine.id, routine.title, routine.duration);
        }
        this.loadAndSetSelectedRoutineTopicsByRoutineId(routine.id);
    })
  }

  private loadAndSetSelectedRoutineTopicsByRoutineId(routineId: number = -1){
    this.loadRoutineTopicsByRoutineId(routineId)
      .pipe(map( (topics: ITopic[]) =>{
        const loadedTopics: Topic[] = [];
        for(let topic of topics){
          const loadedTopic: Topic = new Topic(topic.id, topic.title);
          loadedTopic.topicSongTitle = topic.songTitle;
          loadedTopic.metronomeValues = topic.metronomes;
          loadedTopics.push(loadedTopic);
        }
        return loadedTopics;
      })).subscribe(
      (topics: Topic[]) =>{
        this.selectedRoutine.setTopics(topics);
        this.selectedRoutineChanged.next(this.selectedRoutine);
      }
    )
  }

  public loadRoutineById(routineId: number) {
    return  this.http.get<IRoutine>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}`);
  }

  public loadRoutineTopicsByRoutineId(routineId: number = -1){
    return this.http.get<ITopic[]>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}/topics`)
      .pipe(map((topic: ITopic[])=>{
        let loadedTopics: ITopic[] = [];
        topic.forEach(topic => loadedTopics.push({
          id: topic.id,
          title: topic.title,
          songTitle: topic.songTitle,
          timeDuration: topic.timeDuration,
          chords: [],
          topicChordChanges: [],
          strumPatterns: [],
          metronomes: {bpm: 100, beatsPerMeasure: 4}
        }));
        return loadedTopics;
      }));
  }

  public loadRoutineAndItsTopicContentsByRoutineId(routineId: number = -1){
    return this.loadRoutineById(routineId)
      .pipe(switchMap((routine:IRoutine) => this.loadRoutineTopicsByRoutineId(routine.id)
        .pipe(map((topics: ITopic[]) =>{
          let loadedRoutine: IRoutine ={
            ...routine,
            topics: topics
          }
          return loadedRoutine;
        }))),
        switchMap((routine: IRoutine) =>{
          const topics: ITopic[] = routine.topics || [];
          const topicComponentArray$: Observable<ITopic>[] = [];
          topics.forEach( topic =>{
            topicComponentArray$.push(
            forkJoin({
                 chords: this.loadTopicChords(topic.id),
                 chordChanges: this.loadTopicChordChanges(topic.id),
                 strumPatterns: this.loadTopicStrumPatterns(topic.id),
                 metronomeValue: this.loadTopicMetronome(topic.id)
            }).pipe(map(topicComponents => {
              topic.chords = topicComponents.chords;
              topic.topicChordChanges = topicComponents.chordChanges;
              topic.metronomes = topicComponents.metronomeValue;
              topic.strumPatterns = topicComponents.strumPatterns;
              return topic;
            })))
          })
          return forkJoin(topicComponentArray$)
            .pipe(map((topics: ITopic[]) => {
              routine.topics = topics;
              return routine;
            }));
      }));

  }

  private loadTopicStrumPatterns(topicId: number = -1){
    return this.http.get<IStrumPatterns[]>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/strum-patterns`)
      .pipe(map((loadedPatterns: IStrumPatterns[])=>{
        let actualPatterns: IStrumPatterns[] = [];
        for (const pattern of loadedPatterns) {
          if(pattern){
            actualPatterns.push({
              pattern: pattern.pattern
            })
          }
        }
        return actualPatterns;
      }));
  }

  private loadTopicChordChanges(topicId: number = -1){
    return this.http.get<IChordChangesDTO[]>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chord-changes`)
      .pipe(map((loadedChanges: IChordChangesDTO[]) =>{
        let actualChanges: IChordChanges[] = [];
        for (const change of loadedChanges) {
            actualChanges.push({
              changeFrom: {
                chordKeyId: change.changeFrom.id.chordKeyId,
                chordRootOrder: change.changeFrom.id.chordRootOrder,
                chordRootName: change.changeFrom.chordRootName,
                chordKeyName: change.changeFrom.chordKeyName
              },
              changeTo: {
                chordKeyId: change.changeTo.id.chordKeyId,
                chordRootOrder: change.changeTo.id.chordRootOrder,
                chordRootName: change.changeTo.chordRootName,
                chordKeyName: change.changeTo.chordKeyName
              }
            })
        }
        return actualChanges;
      }));
  }

  private loadTopicChords(topicId: number = -1){
    return this.http.get<IChordDTO[]>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/chords`)
      .pipe(map((loadedChords: IChordDTO[]) =>{
        let chords: IChords[] = [];
        for (const chord of loadedChords) {
            chords.push({
              chordKeyId: chord.id.chordKeyId,
              chordRootOrder: chord.id.chordRootOrder,
              chordRootName: chord.chordRootName,
              chordKeyName: chord.chordKeyName
            })
        }
        return chords;
      }))
  }

  private loadTopicMetronome(topicId: number = -1){
    return this.http.get<IMetronomeValues>(`http://localhost:8080/ProjectNightingale/api/practice/topics/${topicId}/metronomes`)
      .pipe(map((metronomeVal: IMetronomeValues) =>{
        let metronomeValue: IMetronomeValues = {
          bpm: 100,
          beatsPerMeasure: 4
        };
        if(metronomeVal){
          metronomeValue.bpm = metronomeVal.bpm;
          metronomeValue.beatsPerMeasure = metronomeVal.beatsPerMeasure;
        }
        return metronomeValue;
      }))
  }

  setSelectedRoutine(selectedRoutine: Routine) {
    this.selectedRoutine = selectedRoutine;
  }

  deleteRoutineById(routineId: number) {
     return this.http.delete(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}`)
      .pipe(map(()=>{
      }));
  }
}
