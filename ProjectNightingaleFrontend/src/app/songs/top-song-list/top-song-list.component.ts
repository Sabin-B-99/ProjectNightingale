import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Song} from "../../models/song-model/song";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-top-song-list',
  templateUrl: './top-song-list.component.html',
  styleUrls: ['./top-song-list.component.css']
})
export class TopSongListComponent implements OnInit{

  public songs: Song[];
  constructor(private songService: SongService) {
  }
  emitSelectedSong(song: Song) {
    this.songService.selectedSong.emit(song);
  }

  ngOnInit(): void {
    this.songs = this.songService.getTopSongs();
  }
}
