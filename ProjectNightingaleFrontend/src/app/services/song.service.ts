import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  IGuitarOtherReqDetailsDTO,
  IGuitarTabDTO,
  IGuitarTabLyricsDTO,
  IHarmonicaOtherReqDetailsDTO,
  IHarmonicaTabDTO,
  IHarmonicaTabLyricsDTO,
  ILyricsOnlyTabDTO,
  ILyricsOnlyTabLyricsDTO,
  IOtherArtistDTO,
  ISongTabDTO
} from "../types/song-interfaces";
import {forkJoin, map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }


  public loadLyricsOnlyTabByTabId(tabId: string){
    return this.loadTabById(tabId)
      .pipe(switchMap((selectedSong: ISongTabDTO) => {
          return  forkJoin({
            otherArtists: this.loadSelectedSongOtherArtists(selectedSong.id || ''),
            lyrics: this.loadSelectedSongLyrics(selectedSong.id || '')
          }).pipe(map(value => {
              const loadedTab: ILyricsOnlyTabDTO = {
                tabDetails: selectedSong,
                otherArtists: value.otherArtists,
                tabLyrics: value.lyrics
              };
              return loadedTab;
            }));
      }));
  }

  public loadGuitarTabByTabId(tabId: string){
    return this.loadTabById(tabId)
      .pipe(switchMap((selectedTab: ISongTabDTO) =>{
        return forkJoin({
          otherArtists: this.loadSelectedSongOtherArtists(selectedTab.id || ''),
          guitarOtherReqDetails: this.loadGuitarTabOtherReqDetailsByTabId(selectedTab.id || ''),
          lyrics: this.loadGuitarTabLyricsByTabId(selectedTab.id || '')
        }).pipe(map(value => {
          const loadedTab: IGuitarTabDTO = {
            tabDetails: selectedTab,
            otherArtists: value.otherArtists,
            guitarOtherReqDetails: value.guitarOtherReqDetails,
            tabLyrics: value.lyrics
          }
          return loadedTab;
        }))
      }));
  }


  public loadHarmonicaTabByTabId(tabId: string){
    return this.loadTabById(tabId)
      .pipe(switchMap((selectedTab: ISongTabDTO) =>{
        return forkJoin({
          otherArtists: this.loadSelectedSongOtherArtists(selectedTab.id || ''),
          harmonicaOtherReqDetails: this.loadHarmonicaTabOtherReqDetailsByTabId(selectedTab.id || ''),
          harmonicaTabLyrics: this.loadHarmonicaTabLyricsByTabId(selectedTab.id || '')
        }).pipe((map(value => {
          const loadedTab: IHarmonicaTabDTO = {
            tabDetails: selectedTab,
            otherArtists: value.otherArtists,
            harmonicaOtherReqDetails: value.harmonicaOtherReqDetails,
            tabLyrics: value.harmonicaTabLyrics
            // tabLyricsCells: value.harmonicaTabLyrics
          }
          return loadedTab;
        })))
      }))
  }

  public loadTabById(tabId: string){
    return this.http.get<ISongTabDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}`);
  }

  private loadSelectedSongOtherArtists(tabId: string){
    return this.http.get<IOtherArtistDTO[]>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/other-artists`);
  }

  private loadSelectedSongLyrics(tabId: string){
    return this.http.get<ILyricsOnlyTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/lyrics-only-tab-lyrics`);
  }

  private loadGuitarTabOtherReqDetailsByTabId(tabId: string){
    return this.http.get<IGuitarOtherReqDetailsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/guitar-other-req-details`)
  }

  private loadGuitarTabLyricsByTabId(tabId: string){
    return this.http.get<IGuitarTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/guitar-tab-lyrics`)
  }

  private loadHarmonicaTabOtherReqDetailsByTabId(tabId: string){
    return this.http.get<IHarmonicaOtherReqDetailsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/harmonica-other-req-details`)
  }

  private loadHarmonicaTabLyricsByTabId(tabId: string){
    return this.http.get<IHarmonicaTabLyricsDTO>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${tabId}/harmonica-tab-lyrics`)
  }

  public getSongSearchSuggestions(title: string){
    return this.http.get<ISongTabDTO[]>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${title}/suggestions`);
  }
  public searchSongsByTitle(title: string){
    return  this.http.get<ISongTabDTO[]>(`http://localhost:8080/ProjectNightingale/api/tabs/songs/${title}/results`);
  }

}
