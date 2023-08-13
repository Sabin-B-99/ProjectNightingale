import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SongsComponent} from "./songs/songs.component";
import {ChordsComponent} from "./chords/chords.component";
import {SongbooksComponent} from "./songbook/songbooks.component";
import {RoutineDetailComponent} from "./routines/routine-detail/routine-detail.component";
import {RoutinesComponent} from "./routines/routines.component";
import {SongDetailComponent} from "./songs/song-detail/song-detail.component";
import {RoutineCreatorComponent} from "./routines/routine-creator/routine-creator.component";
import {MetronomeComponent} from "./metronome/metronome.component";
import {SongTabCreatorComponent} from "./songs/song-tab-creator/song-tab-creator.component";

const appRoutes: Routes = [
  {path: '', pathMatch: "full", redirectTo:'/routines'},
  {path: 'song-book', component: SongbooksComponent},
  {path: 'songs', component: SongsComponent,
    children: [
      {path: 'create', component: SongTabCreatorComponent},
      {path: ':id', component: SongDetailComponent}
    ]},
  {path: 'chords', component: ChordsComponent},
  {path: 'metronome', component: MetronomeComponent},
  {path: 'routines', component: RoutinesComponent,
    children: [
      {path: ':id/topics', component: RoutineDetailComponent},
      {path: 'create', component: RoutineCreatorComponent}
    ]},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
