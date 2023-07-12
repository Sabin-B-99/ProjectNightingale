import {Chord} from "../chord-model/chord";

export class Topic{


  public selectedChords: Chord[] = [];
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
}
