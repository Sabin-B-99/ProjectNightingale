import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabRequiredDetailsComponent} from "./tab-required-details/tab-required-details.component";
import {TabCreatorService} from "../../services/tab-creator.service";
import {Subscription} from "rxjs";
import {Chord} from "../../models/chord-model/chord";

@Component({
  selector: 'app-song-tab-creator',
  templateUrl: './song-tab-creator.component.html',
  styleUrls: ['./song-tab-creator.component.css']
})
export class SongTabCreatorComponent implements OnInit, OnDestroy{

  tabCreationForm: FormGroup;


  selectedChordsForTabSubscription: Subscription;
  selectedChordsForTab: Chord[] = [];


  constructor(private tabCreatorService: TabCreatorService) {
  }

  ngOnInit(): void {
    this.tabCreationForm = new FormGroup({
      'tabRequiredDetails': TabRequiredDetailsComponent.getTabRequiredDetailForm(),
      'tabLyricsArea': new FormControl<string>('', [Validators.required])
    });

    this.selectedChordsForTabSubscription = this.tabCreatorService.selectedChordsChangedEvenEmitter
      .subscribe(
        (selectedChords: Chord[]) =>{
          this.selectedChordsForTab = selectedChords
        }
      );
  }

  ngOnDestroy() {
    if(this.selectedChordsForTabSubscription){
      this.selectedChordsForTabSubscription.unsubscribe();
    }
  }

  onTabCreationFormSubmitted(){
    console.log(this.tabCreationForm.value);
  }

  getTabRequiredDetailsForm(): FormGroup{
    return <FormGroup>this.tabCreationForm.get('tabRequiredDetails')
  }

  addSelectedChordInTab(selectedChord: Chord) {
  }
}
