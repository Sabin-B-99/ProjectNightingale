import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Chord} from "../../../../../models/chord-model/chord";

@Component({
  selector: 'app-topic-chord-changes-menu',
  templateUrl: './topic-chord-changes-menu.component.html',
  styleUrls: ['./topic-chord-changes-menu.component.css']
})
export class TopicChordChangesMenuComponent  implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  selectedChordsChangesFrom: Chord[];
  selectedChordsChangesTo: Chord[];


  constructor() {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onCloseClicked(){
    this.close.emit();
  }

}
