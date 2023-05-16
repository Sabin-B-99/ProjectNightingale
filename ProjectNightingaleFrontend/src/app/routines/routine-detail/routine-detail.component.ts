import {Component, Input, OnInit} from '@angular/core';
import {Routine} from "../../models/routine-model/routine";

@Component({
  selector: 'app-routine-detail',
  templateUrl: './routine-detail.component.html',
  styleUrls: ['./routine-detail.component.css']
})
export class RoutineDetailComponent implements OnInit{
  @Input() selectedRoutine: Routine;

  constructor() {
  }
  ngOnInit(): void {
  }
}
