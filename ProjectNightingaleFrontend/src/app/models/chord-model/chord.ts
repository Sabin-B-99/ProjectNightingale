import {ChordKey} from "./chord-key-model/chord-key";
import {ChordRoot} from "./chord-root-model/chord-root";

export class Chord{
  constructor(public chordRoot: ChordRoot,public chordKey: ChordKey) {
  }
}
