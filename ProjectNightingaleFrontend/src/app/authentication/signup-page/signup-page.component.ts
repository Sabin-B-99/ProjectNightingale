import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {noWhiteSpaceValidator} from "../../validators/no-white-space-validator.directive";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit{
  signUpForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.email]),
      'username': new FormControl('', [Validators.required, noWhiteSpaceValidator()]),
      'password': new FormControl('', [Validators.required, noWhiteSpaceValidator()])
    })
  }

  onRegistrationFormSubmitted() {
  }
}
