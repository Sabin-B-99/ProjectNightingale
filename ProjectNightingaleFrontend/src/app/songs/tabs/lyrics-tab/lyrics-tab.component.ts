import {Component, OnDestroy, OnInit} from '@angular/core';
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {ILyricsOnlyTabDTO, ITabRatingDTO} from "../../../types/song-interfaces";
import {Subscription, switchMap} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-lyrics-tab',
  templateUrl: './lyrics-tab.component.html',
  styleUrls: ['./lyrics-tab.component.css']
})
export class LyricsTabComponent implements OnInit, OnDestroy{

  lyricsTab: ILyricsOnlyTabDTO;

  starsSelected: number = 0;
  averageRating: number = 0;
  private tabRatingSubscription: Subscription;
  private averageRatingSubscription: Subscription;
  private userRatingSubscription: Subscription;

  constructor(private songService: SongService,
              private route: ActivatedRoute, private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.route.params
      .pipe(switchMap(param => this.songService.loadLyricsOnlyTabByTabId(param['id'])))
      .subscribe(
        loadedTab  => {
          this.lyricsTab = loadedTab;
          this.loadTabAverageRating(); //TODO: Use Rxjs operators to manage these inner subscriptions properly
          this.loadUserRatingForTab();
        }
      );

  }
  onRated(rating: number) {
    const username: string | null =   this.authService.getAuthenticatedUserInfo().username;
    const tabId: string | undefined = this.lyricsTab.tabDetails.id;
    if(username && tabId){
      this.tabRatingSubscription = this.songService.rateTab(username, tabId, rating)
        .subscribe((rating: ITabRatingDTO) =>{
          this.starsSelected = rating.rating;
          this.loadTabAverageRating();
        });
    }
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
  }

  private loadTabAverageRating(){
    const tabId: string | undefined = this.lyricsTab.tabDetails.id;
    if(tabId){
      this.averageRatingSubscription = this.songService.loadAverageRatingForTab(tabId)
        .subscribe( averageRating => {
          this.averageRating = averageRating.rating
        });
    }
  }

  private loadUserRatingForTab(){
    const tabId: string | undefined = this.lyricsTab.tabDetails.id;
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
