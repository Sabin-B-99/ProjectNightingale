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
  id?: number;
  title: string;
  duration: number;
  topics?: ITopic[];
}

interface IRoutineForm {
  routineTitle: FormControl<string | null>,
  topics: FormArray<FormGroup<ITopicForm>>,
}

interface ITopic{
  id?: number;
  title: string;
  songTitle: string;
  timeDuration: number;
  chords: IChords[];
  topicChordChanges: IChordChanges[];
  strumPatterns: IStrumPatterns[];
  metronomes: IMetronomeValues;
}

interface ITopicDTO{
  id?: number,
  title: string,
  songTitle?: string,
  timeDuration: number,
  routineId: number
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

interface ISongTabCreationForm{
  tabRequiredDetails: FormGroup<ISongTabCreationRequiredDetailsForm>,
  tabLyricsArea: FormControl<string | null>,
  harmonicaTabArea: FormControl<ITableFormCellValue[] | null>
}

interface ISongTabCreationRequiredDetailsForm{
  songTitle: FormControl<string | null>,
  artistName: FormControl<string | null>,
  otherArtistsJoinPhrase: FormControl<string | null>,
  otherArtistsNames: FormArray<FormControl<string | null>>,
  tuningType: FormControl<string | null>,
  harmonicaType: FormControl<string| null>,
  difficulty: FormControl<string | null>,
  harmonicaKey: FormControl<string | null>,
  capoFret: FormControl<string| null>
}

interface IChordChanges{
  changeFrom: IChords,
  changeTo: IChords
}


interface IStrumPatterns{
  pattern: string
}

interface IChords{
  chordRootOrder: number,
  chordKeyId: number
}

interface IChordDTO{
  id: {
    chordRootOrder: number,
    chordKeyId: number
  }
  chordImageFileName: string
}

interface IChordChangesDTO{
  changeFrom: IChordDTO,
  changeTo: IChordDTO
}

interface ICellNumber{
  row: number,
  col: number
}

interface ITableFormCellValue{
  value: string,
  cellNum: ICellNumber
}

interface ISongTabDTO{
  id?: string,
  songTitle: string,
  artistName: string
}

interface IOtherArtistDTO{
  joinWord: string,
  otherArtistName: string
}

interface IHarmonicaOtherReqDetailsDTO{
  harmonicaType: string,
  harmonicaKey: string,
  difficulty: string
}

interface IGuitarOtherReqDetailsDTO{
  tuningType: string,
  capoPosition: string,
  difficulty: string
}

interface IGuitarTabLyricsDTO{
  lyrics: string
}

interface IHarmonicaTabLyricsDTO{
  tabCellRowNo: number,
  tabCellColNo: number,
  tabCellValue: string
}

interface ILyricsOnlyTabLyricsDTO{
  lyrics: string
}

interface IGuitarTuningTypesDTO{
  id: number,
  tuning: string
}

interface IDifficultyLevelsDTO{
  id: number,
  difficulty: string
}

interface IHarmonicaTypesDTO{
  id: number,
  harmonicaType: string
}

interface IHarmonicaKeyDTO{
  id: number,
  harmonicaKey: string
}

interface IJoinPhraseDTO{
  id: number,
  joinPhrase: string
}

interface ICapoPositionDTO{
  id: number,
  capoPosition: string
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
  IChordChanges,
  IStrumPatterns,
  ITopicDTO,
  ICellNumber,
  ITableFormCellValue,
  ISongTabCreationForm,
  ISongTabCreationRequiredDetailsForm,
  ISongTabDTO,
  IOtherArtistDTO,
  IHarmonicaOtherReqDetailsDTO,
  IGuitarOtherReqDetailsDTO,
  IGuitarTabLyricsDTO,
  IHarmonicaTabLyricsDTO,
  ILyricsOnlyTabLyricsDTO,
  IGuitarTuningTypesDTO,
  IDifficultyLevelsDTO,
  IHarmonicaTypesDTO,
  IHarmonicaKeyDTO,
  IJoinPhraseDTO,
  ICapoPositionDTO,
  IChordDTO,
  IChordChangesDTO
}
