import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SongsComponent} from "./songs/songs.component";
import {ChordsComponent} from "./chords/chords.component";
import {SongbooksComponent} from "./songbook/songbooks.component";
import {RoutineDetailComponent} from "./routines/routine-detail/routine-detail.component";
import {RoutinesComponent} from "./routines/routines.component";
import {LyricsTabComponent} from "./songs/tabs/lyrics-tab/lyrics-tab.component";
import {RoutineCreatorComponent} from "./routines/routine-creator/routine-creator.component";
import {MetronomeComponent} from "./metronome/metronome.component";
import {SongTabCreatorComponent} from "./songs/song-tab-creator/song-tab-creator.component";
import {PractiseComponent} from "./practise/practise.component";
import {GuitarTabComponent} from "./songs/tabs/guitar-tab/guitar-tab.component";
import {HarmonicaTabComponent} from "./songs/tabs/harmonica-tab/harmonica-tab.component";

const appRoutes: Routes = [
  {path: '', pathMatch: "full", redirectTo:'/routines'},
  {path: 'song-book', component: SongbooksComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'songs/:id/lyrics', component: LyricsTabComponent},
  {path: 'songs/:id/guitar-tab', component: GuitarTabComponent},
  {path: 'songs/:id/harmonica-tab', component: HarmonicaTabComponent},
  {path: 'create-tab', component: SongTabCreatorComponent},
  {path: 'chords', component: ChordsComponent},
  {path: 'metronome', component: MetronomeComponent},
  {path: 'routines', component: RoutinesComponent,
    children: [
      {path: ':id/topics', component: RoutineDetailComponent},
      {path: 'create', component: RoutineCreatorComponent}
    ]},
  {path: 'practise/:id', component: PractiseComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
