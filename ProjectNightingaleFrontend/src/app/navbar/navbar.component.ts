import {Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit{

  @Output()
  navItemClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }
  onNavItemClicked(feature: string):void {
    this.navItemClicked.emit(feature);
  }

  ngOnInit(): void {
  }
}
