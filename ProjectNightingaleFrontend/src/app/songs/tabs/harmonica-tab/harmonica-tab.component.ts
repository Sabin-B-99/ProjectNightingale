import {Component, OnInit} from '@angular/core';
import {IHarmonicaTabDTO} from "../../../types/custom-interfaces";
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-harmonica-tab',
  templateUrl: './harmonica-tab.component.html',
  styleUrls: ['./harmonica-tab.component.css']
})
export class HarmonicaTabComponent implements OnInit{

  harmonicaTab: IHarmonicaTabDTO;

  constructor(private songService: SongService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(param => this.songService.loadHarmonicaTabByTabId(param['id'])))
      .subscribe(loadedTab => this.harmonicaTab = loadedTab);
  }

}
