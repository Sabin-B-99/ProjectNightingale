import {Component, OnInit} from '@angular/core';
import {SongService} from "../services/song.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ISongTabDTO} from "../types/custom-interfaces";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit{


  searchResults: ISongTabDTO[] = [];

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
        this.getSearchResults(newSearchData);
      }
    )
  }

  private getSearchResults(title: string){
    if(title.trim().length > 0){
      this.songService.searchSongsByTitle(title)
        .subscribe((results: ISongTabDTO[]) =>{
          this.searchResults = results;
        });
    }else{
      this.searchResults.splice(0, this.searchResults.length);
    }
  }

  onSearchButtonClicked() {
  }
}
