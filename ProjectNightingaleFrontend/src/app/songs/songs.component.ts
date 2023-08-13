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
  songTabCreationFormShown: boolean  = false;
  constructor(private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
  }

  showTabCreationForm() {
    this.songTabCreationFormShown = true;
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
