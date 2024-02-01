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
import {SignupPageComponent} from "./authentication/signup-page/signup-page.component";
import {AuthenticatingComponent} from "./authentication/authenticating/authenticating.component";
import {
  RegistrationConfirmationComponent
} from "./authentication/registration-confirmation/registration-confirmation.component";
import {canActivateAuthenticatedRoutes, canActivateRegistrationAuthenticationUrls} from "./services/auth-guard.service";

const appRoutes: Routes = [
  {path: '', pathMatch: "full", redirectTo:'/songs'},
  {path: 'song-book', component: SongbooksComponent, canActivate: [canActivateAuthenticatedRoutes]},
  {path: 'songs', component: SongsComponent},
  {path: 'songs/:id/lyrics', component: LyricsTabComponent},
  {path: 'songs/:id/guitar-tab', component: GuitarTabComponent},
  {path: 'songs/:id/harmonica-tab', component: HarmonicaTabComponent},
  {path: 'create-tab', component: SongTabCreatorComponent, canActivate: [canActivateAuthenticatedRoutes]},
  {path: 'chords', component: ChordsComponent},
  {path: 'metronome', component: MetronomeComponent},
  {path: 'routines', component: RoutinesComponent, canActivate: [canActivateAuthenticatedRoutes],
    children: [
      {path: ':id/topics', component: RoutineDetailComponent},
      {path: 'create', component: RoutineCreatorComponent}
    ]},
  {path: 'practise/:id', component: PractiseComponent},
  {path: 'register', component: SignupPageComponent},
  {path: 'confirm', component: RegistrationConfirmationComponent, canActivate: [canActivateRegistrationAuthenticationUrls]},
  {path: 'authorized', component: AuthenticatingComponent, pathMatch: "full", canActivate: [canActivateRegistrationAuthenticationUrls]}
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
