import {EventEmitter, Injectable} from '@angular/core';
import {Song} from "../models/song-model/song";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public selectedSong: EventEmitter<Song> = new EventEmitter<Song>();

  private topSongs: Song[] = [
    new Song("Can't help falling in love with you",  "Wise man say..."),
    new Song("Brand new day", "I'll be flicking stones..."),
    new Song("Heartbeats", "One night to be confused..."),
    new Song("Guaranteed", "Whatasayyay anaaya anaya ohhhh yeheyayyy whatasyay whatasya..."),
    new Song("Sadhana", "Tetikai choda na teo kesa lai..."),
  ];
  constructor() { }

  public getTopSongs(): Song[]{
    return this.topSongs.slice();
  }
}
