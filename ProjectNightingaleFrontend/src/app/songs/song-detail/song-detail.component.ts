import {Component, Input} from '@angular/core';
import {Song} from "../../models/song-model/song";

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent {
  @Input()
  selectedSong: Song;
  constructor() {
  }
}
