import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Song} from "../../models/song-model/song";
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-top-song-list',
  templateUrl: './top-song-list.component.html',
  styleUrls: ['./top-song-list.component.css']
})
export class TopSongListComponent implements OnInit{

  public songs: Song[];
  constructor(private songService: SongService,
              private router: Router,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.songs = this.songService.getTopSongs();
  }

  onSongFromTopSongListSelected(id: number) {
    this.router.navigate([id], {relativeTo: this.route});
  }
}
