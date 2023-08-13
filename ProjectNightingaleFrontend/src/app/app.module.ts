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
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { SongListComponent } from './songs/song-list/song-list.component';
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
import {HttpClientModule} from "@angular/common/http";
import { SongTabCreatorComponent } from './songs/song-tab-creator/song-tab-creator.component';
import { TabRequiredDetailsComponent } from './songs/song-tab-creator/tab-required-details/tab-required-details.component';

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
    SongDetailComponent,
    SongListComponent,
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
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgOptimizedImage,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
