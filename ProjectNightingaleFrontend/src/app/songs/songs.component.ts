import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Song} from "../models/song-model/song";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit{

  selectedSong: Song;
  constructor() {
  }

  ngOnInit(): void {
  }


  assignSelectedSong(selectedSong: Song) {
    this.selectedSong = selectedSong;
  }
}
