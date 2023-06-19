import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import { RoutineListComponent } from './routines/routine-list/routine-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SongsComponent } from './songs/songs.component';
import { TopicListComponent } from './routines/routine-detail/topics/topic-list/topic-list.component';
import { SongbooksComponent } from './songbook/songbooks.component';
import { SongbookItemComponent } from './songbook/songbook-item/songbook-item.component';
import { ChordsComponent } from './chords/chords.component';
import { RoutinesComponent } from './routines/routines.component';
import { RoutineDetailComponent } from './routines/routine-detail/routine-detail.component';
import { RoutineCreatorComponent } from './routines/routine-creator/routine-creator.component';
import {TopicCreatorComponent} from "./routines/routine-detail/topics/topic-creator/topic-creator.component";
import { SongDetailComponent } from './songs/song-detail/song-detail.component';
import { TopSongListComponent } from './songs/top-song-list/top-song-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChordListComponent } from './chords/chord-list/chord-list.component';
import { MusicNotePipe } from './pipes/music-note.pipe';

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
    TopSongListComponent,
    ChordListComponent,
    MusicNotePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
