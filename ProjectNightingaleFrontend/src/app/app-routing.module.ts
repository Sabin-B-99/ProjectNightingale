import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SongsComponent} from "./songs/songs.component";
import {ChordsComponent} from "./chords/chords.component";
import {SongbooksComponent} from "./songbook/songbooks.component";
import {RoutineDetailComponent} from "./routines/routine-detail/routine-detail.component";
import {RoutinesComponent} from "./routines/routines.component";
import {SongDetailComponent} from "./songs/song-detail/song-detail.component";

const appRoutes: Routes = [
  {path: '', pathMatch: "full", redirectTo:'/routines'},
  {path: 'song-book', component: SongbooksComponent},
  {path: 'songs', component: SongsComponent,
    children: [
      {path: ':id', component: SongDetailComponent}
    ]},
  {path: 'chords', component: ChordsComponent},
  {path: 'routines', component: RoutinesComponent,
    children: [
      {path: ':id/topics', component: RoutineDetailComponent}
    ]},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
