import {Component, OnInit} from '@angular/core';
import {SongService} from "../services/song.service";
import {ActivatedRoute, Router} from "@angular/router";

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
