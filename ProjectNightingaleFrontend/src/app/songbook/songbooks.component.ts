import { Component } from '@angular/core';
import {Songbook} from "./songbook-item/songbook";

@Component({
  selector: 'app-songbook',
  templateUrl: './songbooks.component.html',
  styleUrls: ['./songbooks.component.css']
})
export class SongbooksComponent {
  songbooks: Songbook[] = [
    new Songbook('Classics'),
    new Songbook('Metal')
  ]

  constructor() {
  }
}
