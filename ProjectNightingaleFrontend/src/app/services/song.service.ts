import {EventEmitter, Injectable} from '@angular/core';
import {Song} from "../models/song-model/song";
import {HttpClient} from "@angular/common/http";
import {ISongTabDTO} from "../types/custom-interfaces";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {


  private topSongs: Song[] = [
    new Song("Can't help falling in love with you",  "Wise man say..."),
    new Song("Brand new day", "I'll be flicking stones..."),
    new Song("Heartbeats", "One night to be confused..."),
    new Song("Guaranteed", "Whatasayyay anaaya anaya ohhhh yeheyayyy whatasyay whatasya..."),
    new Song("Sadhana", "Tetikai choda na teo kesa lai..."),
  ];

  private searchResults: ISongTabDTO[] = [];
  searchResultsChanges: Subject<ISongTabDTO[]> = new Subject<ISongTabDTO[]>();
  constructor(private http: HttpClient) { }

  public getTopSongs(): Song[]{
    return this.topSongs.slice();
  }

  public getSelectedSongById(id: number): Song{
    return this.topSongs[id];
  }


  public getSongSearchSuggestions(title: string){
    return this.http.get<ISongTabDTO[]>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/search/${title}`);
  }
  public searchSongsByTitle(title: string){
    return  this.http.get<ISongTabDTO[]>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${title}`);
      // .subscribe((results: ISongTabDTO[]) =>{
      //   this.searchResults = results;
      //   this.searchResultsChanges.next(this.searchResults.slice());
      // });
  }

}
