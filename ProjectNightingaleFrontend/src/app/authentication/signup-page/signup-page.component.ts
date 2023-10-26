import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit{
  signUpForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl(''),
      'username': new FormControl(''),
      'password': new FormControl(''),
      'confirmPassword': new FormControl('')
    })
  }

  onRegistrationFormSubmitted() {

  }
}
