import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faStar, IconDefinition} from "@fortawesome/free-solid-svg-icons";

//From stackoverflow: https://stackoverflow.com/questions/55092949/angular-star-rating

//TODO: Code has been repeated among harmonica-tab, guitar-tab and lyrics-tab component. refactor that shit later
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input()
  averageRating: number;

  stars: number[] = [1, 2, 3, 4, 5];

  @Output()
  selectedStarEvent: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  selectedStar: number = 0;

  starIcon: IconDefinition = faStar;
  constructor() { }
  countStar(star: number) {
    this.selectedStar = star;
    this.selectedStarEvent.emit(this.selectedStar);
  }
}
