import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RoutineListComponent} from "./routines/routine-list/routine-list.component";
import {SongsComponent} from "./songs/songs.component";
import {ChordsComponent} from "./chords/chords.component";
import {SongbooksComponent} from "./songbook/songbooks.component";

const appRoutes: Routes = [
  {path: '', pathMatch: "full", redirectTo:'/routines'},
  {path: 'routines', component: RoutineListComponent},
  {path: 'song-book', component: SongbooksComponent},
  {path: 'songs', component: SongsComponent},
  {path: 'chords', component: ChordsComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
