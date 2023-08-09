import {Injectable} from '@angular/core';
import {Routine} from "../models/routine-model/routine";
import {HttpClient} from "@angular/common/http";
import {IRoutine, ITopic} from "../types/custom-interfaces";
import {map, Observable, Subject} from "rxjs";
import {Topic} from "../models/topic-model/topic";

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private selectedRoutine: Routine;
  selectedRoutineChanged: Subject<Routine> = new Subject<Routine>();
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

  private loadSelectedRoutineTopicsByRoutineId(routineId: number){
    this.http.get<ITopic[]>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}/topics`)
      .pipe(map( (topics: ITopic[]) =>{
        const loadedTopics: Topic[] = [];
        for(let topic of topics){
          const loadedTopic: Topic = new Topic(topic.id, topic.title);
          loadedTopic.topicSongTitle = topic.songTitle;
          loadedTopic.metronomeValues = topic.metronome;
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
    this.http.get<IRoutine>(`http://localhost:8080/ProjectNightingale/api/practice/routines/${routineId}`)
      .subscribe((routine: IRoutine) =>{
        if(!this.selectedRoutine){
          this.selectedRoutine = new Routine(routine.id, routine.title, routine.duration);
        }
        this.loadSelectedRoutineTopicsByRoutineId(routine.id);
      })
  }
  setSelectedRoutine(selectedRoutine: Routine) {
    this.selectedRoutine = selectedRoutine;
  }

  getSelectedRoutine(){
    return this.selectedRoutine;
  }


}
