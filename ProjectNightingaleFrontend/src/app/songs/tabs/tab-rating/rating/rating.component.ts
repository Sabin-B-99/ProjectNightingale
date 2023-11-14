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

  _averageRating: number;

  stars: number[] = [1, 2, 3, 4, 5];

  @Output()
  selectedStarEvent: EventEmitter<number> = new EventEmitter<number>();

  _selectedStar: number = 0;

  starIcon: IconDefinition = faStar;
  constructor() { }
  countStar(star: number) {
    this._selectedStar = star;
    this.selectedStarEvent.emit(this._selectedStar);
  }


  @Input() set averageRating(avgRating: number){
    this._averageRating = avgRating;
  }

  @Input() set selectedStar(stars: number){
    this._selectedStar = stars;
  }
}
