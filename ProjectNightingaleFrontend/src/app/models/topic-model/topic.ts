import {Chord} from "../chord-model/chord";
import {ChordChange} from "../chord-change/chord-change";

export class Topic{


  public selectedChords: Chord[] = [];
  public chordChanges: ChordChange[] = [];
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
}
