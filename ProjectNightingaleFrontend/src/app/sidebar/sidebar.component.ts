import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output()
  practiceBtnClicked: EventEmitter<string> = new EventEmitter<string>();
  onPracticeBtnClicked(feature: string) :void{
    this.practiceBtnClicked.emit(feature);
  }
}
