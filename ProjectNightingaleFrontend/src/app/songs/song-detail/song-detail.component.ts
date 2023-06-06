import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../models/song-model/song";
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit{
  selectedSong: Song;
  constructor(private songService: SongService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.selectedSong = this.songService.getSelectedSongById(+params['id']);
        }
      )
  }
}
