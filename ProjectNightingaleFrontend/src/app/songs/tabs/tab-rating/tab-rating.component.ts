import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ITabRatingDTO} from "../../../types/song-interfaces";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {SongService} from "../../../services/song.service";

@Component({
  selector: 'app-tab-rating',
  templateUrl: './tab-rating.component.html',
  styleUrls: ['./tab-rating.component.css']
})
export class TabRatingComponent implements OnInit,OnDestroy{
  starsSelected: number = 0;
  averageRating: number = 0;
  private tabRatingSubscription: Subscription;
  private averageRatingSubscription: Subscription;
  private userRatingSubscription: Subscription;
  private loadedTabSubscription: Subscription;

  tabId: string | undefined;

  constructor(private authService: AuthenticationService,
              private songService: SongService) {
  }

  ngOnInit() {
    this.loadedTabSubscription =  this.songService.loadedTabEmitter
      .subscribe(loadedTabDetails =>{
        if(loadedTabDetails){
          this.tabId = loadedTabDetails.id;
          this.loadTabAverageRating(this.tabId); //TODO: Use Rxjs operators to manage these inner subscriptions properly
          this.loadUserRatingForTab(this.tabId);
        }
      })
  }


  ngOnDestroy() {
    if(this.tabRatingSubscription){
      this.tabRatingSubscription.unsubscribe();
    }
    if(this.averageRatingSubscription){
      this.averageRatingSubscription.unsubscribe();
    }
    if(this.userRatingSubscription){
      this.userRatingSubscription.unsubscribe();
    }
    if(this.loadedTabSubscription){
      this.loadedTabSubscription.unsubscribe();
    }
  }

  onRated(rating: number, tabId: string|undefined) {
    const username: string | null =   this.authService.getAuthenticatedUserInfo().username;
    if(username && tabId){
      this.tabRatingSubscription = this.songService.rateTab(username, tabId, rating)
        .subscribe((rating: ITabRatingDTO) =>{
          this.starsSelected = rating.rating;
          this.loadTabAverageRating(tabId);
        });
    }
  }

  private loadTabAverageRating(tabId: string | undefined){
    if(tabId){
      this.averageRatingSubscription = this.songService.loadAverageRatingForTab(tabId)
        .subscribe( averageRating => {
          this.averageRating = averageRating.rating
        });
    }
  }

  private loadUserRatingForTab(tabId: string | undefined){
    if(this.authService.getAuthToken() && tabId){
      const username: string | null =  this.authService.getAuthenticatedUserInfo().username;
      if(username){
        this.userRatingSubscription = this.songService.loadRatingForSongByUser(username, tabId)
          .subscribe(userRating => {
            this.starsSelected = Math.floor(userRating.rating);
          });
      }
    }
  }
}
