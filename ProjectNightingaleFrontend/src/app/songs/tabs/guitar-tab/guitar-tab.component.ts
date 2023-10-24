import {
  Component,
  ComponentRef,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {IGuitarTabDTO} from "../../../types/custom-interfaces";
import {SongService} from "../../../services/song.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {ChordTooltipDirective} from "../../../directives/chord-tooltip.directive";
import {ChordTooltipComponent} from "../../../chords/chord-tooltip/chord-tooltip.component";

@Component({
  selector: 'app-guitar-tab',
  templateUrl: './guitar-tab.component.html',
  styleUrls: ['./guitar-tab.component.css']
})
export class GuitarTabComponent implements OnInit{

  guitarTab: IGuitarTabDTO;
  lyricsDiv: ElementRef;

  chordToolTipComponentRef: ComponentRef<ChordTooltipComponent>;

  @ViewChild(ChordTooltipDirective, {static: true}) chordToolTip: ChordTooltipDirective;
  constructor(private songService: SongService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap( param => this.songService.loadGuitarTabByTabId(param['id'])))
      .subscribe(loadedTab => {
        this.guitarTab = loadedTab;
      });
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
}
