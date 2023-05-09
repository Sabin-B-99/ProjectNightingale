import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import { RoutinesComponent } from './routines/routines.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SongsComponent } from './songs/songs.component';
import { RoutineItemComponent } from './routines/routine-item/routine-item.component';
import { SongItemComponent } from './songs/song-item/song-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoutinesComponent,
    SidebarComponent,
    SongsComponent,
    RoutineItemComponent,
    SongItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
