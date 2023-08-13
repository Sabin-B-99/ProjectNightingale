import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from "../../models/song-model/song";
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit{

  @Input() listName: string = 'Songs';
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
