import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Song} from "../models/song-model/song";
import {SongService} from "../services/song.service";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit{
  constructor() {
  }
  ngOnInit(): void {
  }
}
