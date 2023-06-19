import { Component } from '@angular/core';
import {ChordService} from "../../services/chord.service";

@Component({
  selector: 'app-chord-list',
  templateUrl: './chord-list.component.html',
  styleUrls: ['./chord-list.component.css']
})
export class ChordListComponent {

  constructor(private chordService: ChordService) {
  }
}
