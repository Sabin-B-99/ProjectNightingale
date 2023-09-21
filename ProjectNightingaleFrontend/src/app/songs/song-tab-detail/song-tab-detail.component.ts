import {Component, Input, OnInit} from '@angular/core';
import {SongService} from "../../services/song.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ILyricsOnlyTabDTO} from "../../types/custom-interfaces";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-song-tab-detail',
  templateUrl: './song-tab-detail.component.html',
  styleUrls: ['./song-tab-detail.component.css']
})
export class SongTabDetailComponent implements OnInit{

  selectedTab: ILyricsOnlyTabDTO;
  constructor(private songService: SongService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(param => this.songService.loadLyricsOnlyTabByTabId(param['id'])))
      .subscribe(
        loadedTab  => {
          this.selectedTab = loadedTab;
        }
      );
  }
}
