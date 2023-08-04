interface IMetronomeValues {
  bpm: number;
  beatsPerMeasure: number;
}

interface IChordRoot{
  id: number;
  rootOrder: number;
  rootName: string;
}

interface IChordKey{
  id: number;
  keyName: string;
}

export {
  IMetronomeValues,
  IChordRoot,
  IChordKey
}
