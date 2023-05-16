import {Component, EventEmitter, Output} from '@angular/core';
import {Song} from "../../models/song-model/song";

@Component({
  selector: 'app-top-song-list',
  templateUrl: './top-song-list.component.html',
  styleUrls: ['./top-song-list.component.css']
})
export class TopSongListComponent {

  @Output()
  selectedSongEmitter: EventEmitter<Song> = new EventEmitter<Song>();

  public songs: Song[] = [
    new Song("Can't help falling in love with you",  "Wise man say..."),
    new Song("Brand new day", "I'll be flicking stones..."),
    new Song("Heartbeats", "One night to be confused..."),
    new Song("Guaranteed", "Whatasayyay anaaya anaya ohhhh yeheyayyy whatasyay whatasya..."),
    new Song("Sadhana", "Tetikai choda na teo kesa lai..."),
  ];

  emitSelectedSong(song: Song) {
    this.selectedSongEmitter.emit(song);
  }
}
