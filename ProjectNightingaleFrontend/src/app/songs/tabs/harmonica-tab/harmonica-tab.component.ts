import {Component, OnDestroy, OnInit} from '@angular/core';
import {IHarmonicaTabDTO, ITabRatingDTO} from "../../../types/song-interfaces";
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-harmonica-tab',
  templateUrl: './harmonica-tab.component.html',
  styleUrls: ['./harmonica-tab.component.css']
})
export class HarmonicaTabComponent implements OnInit, OnDestroy{

  harmonicaTab: IHarmonicaTabDTO;

  starsSelected: number = 0;
  averageRating: number = 0;
  private tabRatingSubscription: Subscription;
  private averageRatingSubscription: Subscription;
  private userRatingSubscription: Subscription;
  constructor(private songService: SongService,
              private route: ActivatedRoute,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(param => this.songService.loadHarmonicaTabByTabId(param['id'])))
      .subscribe(loadedTab => {
        this.harmonicaTab = loadedTab;
        this.loadTabAverageRating(); //TODO: Use Rxjs operators to manage these inner subscriptions properly
        this.loadUserRatingForTab();  this.harmonicaTab = loadedTab
      });
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


  onRated(rating: number) {
    const username: string | null =   this.authService.getAuthenticatedUserInfo().username;
    const tabId: string | undefined = this.harmonicaTab.tabDetails.id;
    if(username && tabId){
      this.tabRatingSubscription = this.songService.rateTab(username, tabId, rating)
        .subscribe((rating: ITabRatingDTO) =>{
          this.starsSelected = rating.rating;
          this.loadTabAverageRating();
        });
    }
  }

  private loadTabAverageRating(){
    const tabId: string | undefined = this.harmonicaTab.tabDetails.id;
    if(tabId){
      this.averageRatingSubscription = this.songService.loadAverageRatingForTab(tabId)
        .subscribe( averageRating => {
          this.averageRating = averageRating.rating
        });
    }
  }

  private loadUserRatingForTab(){
    const tabId: string | undefined = this.harmonicaTab.tabDetails.id;
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
