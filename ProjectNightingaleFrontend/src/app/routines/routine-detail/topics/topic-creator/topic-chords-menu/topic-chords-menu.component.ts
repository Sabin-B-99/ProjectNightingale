import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic-chords-menu',
  templateUrl: './topic-chords-menu.component.html',
  styleUrls: ['./topic-chords-menu.component.css']
})
export class TopicChordsMenuComponent implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  onCloseClicked() {
    this.close.emit();
  }
}
