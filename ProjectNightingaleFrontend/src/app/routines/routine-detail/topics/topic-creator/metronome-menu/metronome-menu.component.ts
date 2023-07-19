import {Component, EventEmitter, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-metronome-menu',
  templateUrl: './metronome-menu.component.html',
  styleUrls: ['./metronome-menu.component.css']
})
export class MetronomeMenuComponent {

  @Output()
  metronomeMenuClosed: EventEmitter<void> = new EventEmitter<void>();
  onMetronomeCloseClicked() {
    this.metronomeMenuClosed.next();
  }
}
