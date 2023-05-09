import {Component, OnInit} from '@angular/core';
import {Song} from "./song-item/song";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit{
  public songs: Song[] = [
    new Song("Can't help falling in love with you"),
    new Song("Brand new day"),
    new Song("Heartbeats"),
    new Song("Guaranteed"),
    new Song("Sadhana"),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
