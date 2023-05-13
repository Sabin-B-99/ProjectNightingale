import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import { RoutineListComponent } from './routines/routine-list/routine-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SongsComponent } from './songs/songs.component';
import { RoutineItemComponent } from './routines/routine-list/routine-item/routine-item.component';
import { SongItemComponent } from './songs/song-item/song-item.component';
import { TopicListComponent } from './routines/routine-detail/topics/topic-list/topic-list.component';
import { TopicItemComponent } from './routines/routine-detail/topics/topic-list/topic-item/topic-item.component';
import { SongbooksComponent } from './songbook/songbooks.component';
import { SongbookItemComponent } from './songbook/songbook-item/songbook-item.component';
import { ChordsComponent } from './chords/chords.component';
import { RoutinesComponent } from './routines/routines.component';
import { RoutineDetailComponent } from './routines/routine-detail/routine-detail.component';
import { RoutineCreatorComponent } from './routines/routine-creator/routine-creator.component';
import {TopicCreatorComponent} from "./routines/routine-detail/topics/topic-creator/topic-creator.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutineListComponent,
    SidebarComponent,
    SongsComponent,
    RoutineItemComponent,
    SongItemComponent,
    TopicListComponent,
    TopicItemComponent,
    SongbooksComponent,
    SongbookItemComponent,
    ChordsComponent,
    RoutinesComponent,
    RoutineDetailComponent,
    RoutineCreatorComponent,
    TopicCreatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
