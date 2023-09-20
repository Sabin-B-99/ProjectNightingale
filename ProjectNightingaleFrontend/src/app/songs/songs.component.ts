import {Component, OnInit} from '@angular/core';
import {SongService} from "../services/song.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ISongTabDTO} from "../types/custom-interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit{


  searchSuggestions: ISongTabDTO[] = [];
  searchResults: ISongTabDTO[] = [];
  searchResultsSubscription: Subscription;

  songSearchForm: FormGroup;

  constructor(private songService: SongService) {
  }
  ngOnInit(): void {
    this.initForm();
    this.searchSong();
  }

  private initForm() {
    this.songSearchForm = new FormGroup({
      'searchData': new FormControl<string>('')
    })
  }


  private searchSong(){
    this.songSearchForm.get('searchData')?.valueChanges.subscribe(
      (newSearchData: string) =>{
        this.getSearchSuggestions(newSearchData);
      }
    )
  }

  private getSearchSuggestions(title: string){
    if(title.trim().length > 0){
      this.songService.getSongSearchSuggestions(title)
        .subscribe((results: ISongTabDTO[]) =>{
          this.searchSuggestions = results;
        });
    }else{
      this.searchSuggestions.splice(0, this.searchResults.length);
    }
  }

  private getSearchResults(title: string){
    if(title.trim().length > 0){
      this.songService.searchSongsByTitle(title)
      .subscribe((results: ISongTabDTO[]) =>{
        this.searchResults = results;
      });
    }
  }

  onSearchButtonClicked() {
    this.getSearchResults(this.songSearchForm.get('searchData')?.value);
  }

  onSongClicked(result: ISongTabDTO) {

  }
}
