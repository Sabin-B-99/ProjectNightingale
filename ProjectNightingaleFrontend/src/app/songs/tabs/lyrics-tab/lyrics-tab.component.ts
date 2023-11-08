import {Component, OnInit} from '@angular/core';
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {IGuitarTabDTO, IHarmonicaTabDTO, ILyricsOnlyTabDTO, TabType} from "../../../types/song-interfaces";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'app-lyrics-tab',
  templateUrl: './lyrics-tab.component.html',
  styleUrls: ['./lyrics-tab.component.css']
})
export class LyricsTabComponent implements OnInit{

  lyricsTab: ILyricsOnlyTabDTO;


  constructor(private songService: SongService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(param => this.songService.loadLyricsOnlyTabByTabId(param['id'])))
      .subscribe(
        loadedTab  => {
          this.lyricsTab = loadedTab;
        }
      );
  }
}
