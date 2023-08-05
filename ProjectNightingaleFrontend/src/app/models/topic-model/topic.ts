import {Chord} from "../chord-model/chord";
import {ChordChange} from "../chord-change-model/chord-change";
import {IMetronomeValues} from "../../types/custom-interfaces";

export class Topic{


  public selectedChords: Chord[] = [];
  public chordChanges: ChordChange[] = [];
  public metronomeValues: IMetronomeValues;
  public topicStrumPatterns: string[];
  public topicSongTitle: string;
  constructor(public topicId: number,
              public topicTitle: string,
              public topicTime: number) {
  }

  public toString(): string{
    return this.topicSongTitle + ' ' + this.topicSongTitle;
  }

  public setSelectedChords(selectedChords: Chord[]){
      this.selectedChords = selectedChords;
  }

  setChordChanges(chordChanges: ChordChange[]) {
    this.chordChanges = chordChanges;
  }

  setMetronomeValues(metronomeValues: IMetronomeValues){
    this.metronomeValues = metronomeValues;
  }
}
