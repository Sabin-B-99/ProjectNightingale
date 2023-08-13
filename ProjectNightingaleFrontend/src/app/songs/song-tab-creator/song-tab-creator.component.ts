import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TabRequiredDetailsComponent} from "./tab-required-details/tab-required-details.component";

@Component({
  selector: 'app-song-tab-creator',
  templateUrl: './song-tab-creator.component.html',
  styleUrls: ['./song-tab-creator.component.css']
})
export class SongTabCreatorComponent implements OnInit{

  tabCreationForm: FormGroup;
  ngOnInit(): void {
    this.tabCreationForm = new FormGroup({
      'tabRequiredDetails': TabRequiredDetailsComponent.getTabRequiredDetailForm(),
      'tabLyricsArea': new FormControl<string>('', [Validators.required])
    });
  }

  onTabCreationFormSubmitted(){
    console.log(this.tabCreationForm.value);
  }

  getTabRequiredDetailsForm(): FormGroup{
    return <FormGroup>this.tabCreationForm.get('tabRequiredDetails')
  }

}
