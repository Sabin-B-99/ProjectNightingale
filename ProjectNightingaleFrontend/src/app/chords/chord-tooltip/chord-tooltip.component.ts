import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import {ChordService} from "../../services/chord.service";
import {Chord} from "../../models/chord-model/chord";
import {ChordKey} from "../../models/chord-model/chord-key-model/chord-key";
import {ChordRoot} from "../../models/chord-model/chord-root-model/chord-root";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-chord-tooltip',
  templateUrl: './chord-tooltip.component.html',
  styleUrls: ['./chord-tooltip.component.css']
})
export class ChordTooltipComponent implements AfterViewInit, OnDestroy{
 @Input() chordName: string = '';
 @Input() left:number = 0;
 @Input() top: number = 0;

 rootName: string;
 keyName: string;
 chordRootToLoad: ChordRoot;
 chordRootLoaded: boolean = false;
 chordKeyToLoad: ChordKey;
 chordKeyLoaded: boolean = false;

 chordToLoad: Chord;

 chordKeySubscription: Subscription;
 chordRootSubscription: Subscription;
 constructor(private chordService: ChordService) {
 }

 ngOnDestroy() {
   if(this.chordRootSubscription){
     this.chordRootSubscription.unsubscribe();
   }
   if(this.chordKeySubscription){
     this.chordKeySubscription.unsubscribe();
   }
 }

 ngAfterViewInit() {
   if(this.chordName){
     this.rootName = this.findChordRoot(this.chordName);
     this.keyName = this.findChordKey(this.chordName);

     this.chordKeySubscription = this.chordService.loadChordKeyByKeyName(this.keyName)
       .subscribe(key =>{
         this.chordKeyToLoad = new ChordKey(key.id, key.keyName);
         this.chordKeyLoaded = true;
         this.setChordIfBothRootAndKeyLoaded();
       }) ;

     this.chordRootSubscription = this.chordService.loadChordRootByRootName(this.rootName)
       .subscribe(root =>{
         this.chordRootToLoad = new ChordRoot(root.rootOrder, root.rootName);
         this.chordRootLoaded = true;
         this.setChordIfBothRootAndKeyLoaded();
       });
   }
 }

  private findChordKey(chordName: string): string{
   let chordKey: string = '';
   if(chordName.at(1) === 'b' || chordName.at(1) === '#'){
     chordKey = chordName.substring(2);
   }else{
     chordKey = chordName.substring(1);
   }
   return chordKey;
 }

 private findChordRoot(chordName: string): string{
   let chordRoot: string = '';
   chordRoot = chordRoot.concat(chordName.at(0) || '');
   if(chordName.at(1) === 'b' || chordName.at(1) === '#'){
     chordRoot = chordRoot.concat(chordName.at(1) || '');
   }
   return chordRoot;
 }

 private setChordIfBothRootAndKeyLoaded(){
   if(this.chordRootLoaded && this.chordKeyLoaded){
     this.chordToLoad = new Chord(this.chordRootToLoad, this.chordKeyToLoad);
   }
 }
}
