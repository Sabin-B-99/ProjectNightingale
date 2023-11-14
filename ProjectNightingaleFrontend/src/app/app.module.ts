import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import { RoutineListComponent } from './routines/routine-list/routine-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SongsComponent } from './songs/songs.component';
import { TopicListComponent } from './routines/routine-detail/topic-list/topic-list.component';
import { SongbooksComponent } from './songbook/songbooks.component';
import { SongbookItemComponent } from './songbook/songbook-item/songbook-item.component';
import { ChordsComponent } from './chords/chords.component';
import { RoutinesComponent } from './routines/routines.component';
import { RoutineDetailComponent } from './routines/routine-detail/routine-detail.component';
import { RoutineCreatorComponent } from './routines/routine-creator/routine-creator.component';
import {TopicCreatorComponent} from "./routines/topic-creator/topic-creator.component";
import { LyricsTabComponent } from './songs/tabs/lyrics-tab/lyrics-tab.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChordListComponent } from './chords/chord-list/chord-list.component';
import { MusicNotePipe } from './pipes/music-note.pipe';
import { ChordItemComponent } from './chords/chord-item/chord-item.component';
import { TopicChordChangesMenuComponent } from './routines/topic-creator/custom-form-controls/topic-chord-changes-menu/topic-chord-changes-menu.component';
import { TopicChordsMenuComponent } from './routines/topic-creator/custom-form-controls/topic-chords-menu/topic-chords-menu.component';
import { DivToggledDirective } from './directives/div-toggled.directive';
import {NgOptimizedImage} from "@angular/common";
import { MetronomeComponent } from './metronome/metronome.component';
import { MetronomeMenuComponent } from './routines/topic-creator/custom-form-controls/metronome-menu/metronome-menu.component';
import { DurationInputComponent } from './routines/topic-creator/custom-form-controls/duration-input/duration-input.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { SongTabCreatorComponent } from './songs/song-tab-creator/song-tab-creator.component';
import { TabRequiredDetailsComponent } from './songs/song-tab-creator/tab-required-details/tab-required-details.component';
import { HarmonicaTabInputArrayComponent } from './songs/song-tab-creator/custom-form-controls/harmonica-tab-input-array/harmonica-tab-input-array.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { PractiseComponent } from './practise/practise.component';
import { TimerComponent } from './practise/timer/timer.component';
import { TransformIntoHHMMSSPipe } from './pipes/transform-into-hhmmss.pipe';
import { TopicCardComponent } from './practise/topic-card/topic-card.component';
import { GuitarTabComponent } from './songs/tabs/guitar-tab/guitar-tab.component';
import { HarmonicaTabComponent } from './songs/tabs/harmonica-tab/harmonica-tab.component';
import { LinkifyChordsPipe } from './pipes/linkify-chords.pipe';
import { ChordTooltipComponent } from './chords/chord-tooltip/chord-tooltip.component';
import { ChordTooltipDirective } from './directives/chord-tooltip.directive';
import { LoginPageComponent } from './authentication/login-page/login-page.component';
import { SignupPageComponent } from './authentication/signup-page/signup-page.component';
import { AuthenticatingComponent } from './authentication/authenticating/authenticating.component';
import { RegistrationConfirmationComponent } from './authentication/registration-confirmation/registration-confirmation.component';
import {AuthenticationInterceptorService} from "./services/authentication-interceptor.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { TabRatingComponent } from './songs/tabs/tab-rating/tab-rating.component';
import { FormatDatetimePipe } from './pipes/format-datetime.pipe';
import {RatingComponent} from "./songs/tabs/tab-rating/rating/rating.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutineListComponent,
    SidebarComponent,
    SongsComponent,
    TopicListComponent,
    SongbooksComponent,
    SongbookItemComponent,
    ChordsComponent,
    RoutinesComponent,
    RoutineDetailComponent,
    RoutineCreatorComponent,
    TopicCreatorComponent,
    LyricsTabComponent,
    ChordListComponent,
    MusicNotePipe,
    ChordItemComponent,
    TopicChordChangesMenuComponent,
    TopicChordsMenuComponent,
    DivToggledDirective,
    MetronomeComponent,
    MetronomeMenuComponent,
    DurationInputComponent,
    SongTabCreatorComponent,
    TabRequiredDetailsComponent,
    HarmonicaTabInputArrayComponent,
    PractiseComponent,
    TimerComponent,
    TransformIntoHHMMSSPipe,
    TopicCardComponent,
    GuitarTabComponent,
    HarmonicaTabComponent,
    LinkifyChordsPipe,
    ChordTooltipComponent,
    ChordTooltipDirective,
    LoginPageComponent,
    SignupPageComponent,
    AuthenticatingComponent,
    RegistrationConfirmationComponent,
    RatingComponent,
    TabRatingComponent,
    FormatDatetimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    NoopAnimationsModule,
    MatAutocompleteModule,
    FontAwesomeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
