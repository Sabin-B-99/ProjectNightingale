import {ChordKey} from "./chord-key-model/chord-key";
import {ChordRoot} from "./chord-root-model/chord-root";

export class Chord{
  //TODO: Make this dynamic once backend is integrated.
  public imagePath: string = "https://www.guitarlessons.org/wp-content/uploads/2022/07/a-chord-diagram.png.webp";
  constructor(public chordRoot: ChordRoot,public chordKey: ChordKey) {
  }
}
