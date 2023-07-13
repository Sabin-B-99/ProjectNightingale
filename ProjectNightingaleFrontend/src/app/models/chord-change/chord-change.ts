import {Chord} from "../chord-model/chord";

export class ChordChange{
  constructor(private chordFrom: Chord, private chordTo: Chord) {
  }

    getChordFromRootName(): string{
      return this.chordFrom?.chordRoot.rootName;
    }

    getChordFromKeyName(): string{
      return this.chordFrom?.chordKey.keyName;
    }
    getChordToRootName(): string{
      return this.chordTo?.chordRoot.rootName;
    }

    getChordToKeyName(): string{
      return this.chordTo?.chordKey.keyName;
    }

  getFromChord():Chord {
    return this.chordFrom;
  }

  getToChord(): Chord{
    return this.chordTo
  }
}
