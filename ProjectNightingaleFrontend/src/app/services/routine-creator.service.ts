import { Injectable } from '@angular/core';
import {IRoutine, ITopic, IRoutineForm, ITopicForm} from "../types/custom-interfaces";
import {FormArray, FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class RoutineCreatorService {

  routineCreated: IRoutine = {
    id: -1,
    title: '',
    topics: [],
    duration: -1
  };
  private totalRoutineDuration: number = 0;
  constructor() {
  }

  buildAndSaveRoutine(controls: IRoutineForm) {
    this.routineCreated.id = -1;
    this.routineCreated.title = controls.routineTitle.value || '';
    this.routineCreated.topics = this.buildTopics(controls.topics);
    this.routineCreated.duration = this.calculateRoutineTotalDuration(this.routineCreated.topics);
    console.log(this.routineCreated);
  }

  private buildTopics(topicsControls: FormArray<FormGroup<ITopicForm>>): ITopic[] {
    let topics: ITopic[] = [];

    for (let topicControlValue of topicsControls.value){

      topics.push(
        {
          id: -1,
          title: topicControlValue.topicTitle || '',
          songTitle: topicControlValue.topicSongTitle || '',
          chordChanges: topicControlValue.topicChordChanges || [],
          topicChords: topicControlValue.topicChords || [],
          metronome: topicControlValue.topicMetronome || {bpm: -1, beatsPerMeasure: -1},
          strumPatterns: this.buildStrumPatterns(topicControlValue.strumPatterns),
          duration: this.buildTopicTime(topicControlValue.topicTime || '00:00:00')
        }
      )
    }
    return topics;
  }


  buildStrumPatterns(strumPatterns: (string|null)[] | undefined): string[]{
    let addedStrumPatterns: string[] = [];
    if(strumPatterns){
      for (let strumPattern of strumPatterns){
        addedStrumPatterns.push(strumPattern || '')
      }
    }
    return addedStrumPatterns;
  }


  // buildTopics(routineTopics: Topic[]): ITopic[]{
  //   let topics: ITopic[] = [];
  //   for (let topic of routineTopics){
  //     let selectedChords: IChords[] = this.separateTopicChords(topic.selectedChords);
  //     let selectedChordChanges: IChordChanges[] = this.separateTopicChordChanges(topic.chordChanges);
  //     let topicTime: number = this.buildTopicTime(topic.topicTime);
  //     topics.push(
  //       {
  //         id: -1,
  //         title: topic.topicTitle,
  //         songTitle: topic.topicSongTitle,
  //         topicChords: selectedChords,
  //         chordChanges: selectedChordChanges,
  //         strumPatterns: topic.topicStrumPatterns,
  //         metronome: topic.metronomeValues,
  //         duration: topicTime
  //       }
  //     );
  //   }
  //   return topics;
  // }
  // private separateTopicChords(selectedChords: Chord[]): IChords[] {
  //   let topicChords: IChords[] =[];
  //   if(selectedChords){
  //     for (let chord of selectedChords){
  //       topicChords.push(
  //         {
  //           root_order: chord.chordRoot.rootOrder,
  //           key_id: chord.chordKey.id
  //         }
  //       )
  //     }
  //   }
  //   return topicChords;
  // }
  //
  // private separateTopicChordChanges(chordChanges: ChordChange[]): IChordChanges[] {
  //   let topicChordChange: IChordChanges[] = [];
  //   if(chordChanges){
  //     for(let chordChange of chordChanges){
  //       topicChordChange.push(
  //         {
  //           change_from_root_order: chordChange.getFromChord().chordRoot.rootOrder,
  //           change_from_key_id: chordChange.getFromChord().chordKey.id,
  //           change_to_root_order: chordChange.getToChord().chordRoot.rootOrder,
  //           change_to_key_id: chordChange.getToChord().chordKey.id
  //         }
  //       )
  //     }
  //   }
  //   return topicChordChange;
  // }


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
        totalDuration += topic.duration;
      }
    }
    return totalDuration;
  }
}
