import {FormArray, FormControl, FormGroup} from "@angular/forms";

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
  topics: ITopic[];
}

interface IRoutineForm {
  routineTitle: FormControl<string | null>,
  topics: FormArray<FormGroup<ITopicForm>>,
}

interface ITopic{
  id: number;
  title: string;
  duration: number;
  songTitle: string;
  strumPatterns: string[];
  chordChanges: IChordChanges[];
  topicChords: IChords[];
  metronome: IMetronomeValues;
}

interface ITopicForm {
  topicTitle: FormControl<string | null>,
  topicSongTitle: FormControl<string | null>,
  topicChords: FormControl<IChords[] | null>,
  topicChordChanges: FormControl<IChordChanges[] | null>,
  strumPatterns: FormArray<FormControl<string | null>>,
  topicMetronome: FormControl<IMetronomeValues | null>,
  topicTime: FormControl<string | null>
}

interface IChordChanges{
  change_from_root_order: number;
  change_from_key_id: number;
  change_to_root_order: number;
  change_to_key_id: number;
}

interface IChords{
  root_order: number;
  key_id: number;
}

export {
  IMetronomeValues,
  IChordRoot,
  IChordKey,
  IRoutine,
  IRoutineForm,
  ITopic,
  ITopicForm,
  IChords,
  IChordChanges
}
