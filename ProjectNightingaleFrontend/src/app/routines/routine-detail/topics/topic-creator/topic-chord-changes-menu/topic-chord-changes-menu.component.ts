import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topic-chord-changes-menu',
  templateUrl: './topic-chord-changes-menu.component.html',
  styleUrls: ['./topic-chord-changes-menu.component.css']
})
export class TopicChordChangesMenuComponent  implements OnInit, OnDestroy{

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>();

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
