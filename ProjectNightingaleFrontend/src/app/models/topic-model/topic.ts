import {Chord} from "../chord-model/chord";
import {ChordChange} from "../chord-change-model/chord-change";
import {IMetronomeValues} from "../../types/custom-interfaces";

export class Topic{


  public selectedChords: Chord[] = [];
  public chordChanges: ChordChange[] = [];
  public metronomeValues: IMetronomeValues;
  constructor(public topicTitle: string,
              public topicSongTitle?: string,
              public topicStrumPattern?: string,
              public topicTime?: string) {
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
