import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit{

  @Output()
  songsNavItemClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }
  onSongsNavItemClicked(feature: string):void {
    this.songsNavItemClicked.emit(feature);
  }

  ngOnInit(): void {
  }
}
