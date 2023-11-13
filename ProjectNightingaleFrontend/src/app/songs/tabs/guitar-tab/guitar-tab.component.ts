import {
  Component,
  ComponentRef,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IGuitarTabDTO, ITabRatingDTO} from "../../../types/song-interfaces";
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {ChordTooltipDirective} from "../../../directives/chord-tooltip.directive";
import {ChordTooltipComponent} from "../../../chords/chord-tooltip/chord-tooltip.component";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-guitar-tab',
  templateUrl: './guitar-tab.component.html',
  styleUrls: ['./guitar-tab.component.css']
})
export class GuitarTabComponent implements OnInit, OnDestroy{

  guitarTab: IGuitarTabDTO;
  lyricsDiv: ElementRef;

  chordToolTipComponentRef: ComponentRef<ChordTooltipComponent>;

  @ViewChild(ChordTooltipDirective, {static: true}) chordToolTip: ChordTooltipDirective;


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
      .pipe(switchMap( param => this.songService.loadGuitarTabByTabId(param['id'])))
      .subscribe(loadedTab => {
        this.guitarTab = loadedTab;
        this.loadTabAverageRating(); //TODO: Use Rxjs operators to manage these inner subscriptions properly
        this.loadUserRatingForTab();
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

  loadChordToolTip(selectedElement: Element){
    const viewContainerRef: ViewContainerRef = this.chordToolTip.viewContainerRef;
    viewContainerRef.clear();
    const componentRef: ComponentRef<ChordTooltipComponent> = viewContainerRef.createComponent<ChordTooltipComponent>
    (ChordTooltipComponent);
    this.setChordTootTipComponentPositionProp(componentRef, selectedElement);
    this.chordToolTipComponentRef = componentRef;
  }

  destroyToolTip(){
    if(!this.chordToolTipComponentRef){
      return;
    }
    this.chordToolTipComponentRef.destroy();
  }

  @ViewChild("lyricsDiv", {static: false}) set content(content: ElementRef){
    if(content){
      this.lyricsDiv = content;
      this.lyricsDiv.nativeElement.querySelectorAll("#chordName").forEach(
        (selectedElement: Element) => {
          selectedElement.addEventListener("mouseover", () =>{
            this.loadChordToolTip(selectedElement);
          });
        }
      );

      this.lyricsDiv.nativeElement.querySelectorAll("#chordName").forEach(
        (selectedElement: Element) =>{
          selectedElement.addEventListener("mouseleave", ()=>{
            this.destroyToolTip();
          })
        }
      );
    }
  }


  private setChordTootTipComponentPositionProp(toolTip: ComponentRef<ChordTooltipComponent>,
                                               selectedChordSpanElement: Element ){
    toolTip.instance.chordName = selectedChordSpanElement.innerHTML;
    const {left, right, bottom} = selectedChordSpanElement.getBoundingClientRect();
    toolTip.instance.left = (right - left) / 2 + left;
    toolTip.instance.top = bottom;
  }


  onRated(rating: number) {
    const username: string | null =   this.authService.getAuthenticatedUserInfo().username;
    const tabId: string | undefined = this.guitarTab.tabDetails.id;
    if(username && tabId){
      this.tabRatingSubscription = this.songService.rateTab(username, tabId, rating)
        .subscribe((rating: ITabRatingDTO) =>{
          this.starsSelected = rating.rating;
          this.loadTabAverageRating();
        });
    }
  }


  private loadTabAverageRating(){
    const tabId: string | undefined = this.guitarTab.tabDetails.id;
    if(tabId){
      this.averageRatingSubscription = this.songService.loadAverageRatingForTab(tabId)
        .subscribe( averageRating => {
          this.averageRating = averageRating.rating
        });
    }
  }

  private loadUserRatingForTab(){
    const tabId: string | undefined = this.guitarTab.tabDetails.id;
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
