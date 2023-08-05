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

interface IRoutine{
  id: number;
  title: string;
  duration: number;
}

interface ITopic{
  id: number;
  title: string;
  duration: number;
  songTitle: string;
  metronome: IMetronomeValues;
}

export {
  IMetronomeValues,
  IChordRoot,
  IChordKey,
  IRoutine,
  ITopic
}
