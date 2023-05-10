import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output()
  sidebarBtnClicked: EventEmitter<string> = new EventEmitter<string>();
  onSidebarBtnClicked(feature: string) :void{
    this.sidebarBtnClicked.emit(feature);
  }
}
