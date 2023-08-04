import {ChordKey} from "./chord-key-model/chord-key";
import {ChordRoot} from "./chord-root-model/chord-root";

export class Chord{
  private imagePath: string|ArrayBuffer|null;
  constructor(public chordRoot: ChordRoot,public chordKey: ChordKey) {
  }

  setImageUrl(imageURL: string|ArrayBuffer|null) {
    this.imagePath = imageURL;
  }

  getImagePath(): string|ArrayBuffer|null {
    return this.imagePath;
  }
}
