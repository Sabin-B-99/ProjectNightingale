import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {noWhiteSpaceValidator} from "../../validators/no-white-space-validator.directive";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {IUserDTO, IUserRegistrationDTO} from "../../types/authentication-interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit, OnDestroy{
  signUpForm: FormGroup;

  registrationFormSubmitted: boolean = false;
  private userRegistrationSubscription: Subscription;

  userNameToRegister: string | null;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'firstname': new FormControl('', [Validators.required, noWhiteSpaceValidator()]),
      'lastname': new FormControl('',[Validators.required, noWhiteSpaceValidator()]),
      'email': new FormControl('', [Validators.email]),
      'username': new FormControl('', [Validators.required, noWhiteSpaceValidator()]),
      'password': new FormControl('', [Validators.required, noWhiteSpaceValidator()])
    })
  }

  ngOnDestroy() {
    if(this.userRegistrationSubscription){
      this.userRegistrationSubscription.unsubscribe();
    }
  }

  onRegistrationFormSubmitted() {
    if(this.signUpForm.valid){
      this.registrationFormSubmitted = true;
      const userToRegister: IUserRegistrationDTO = {
        username: this.signUpForm.get('username')?.value,
        password: this.signUpForm.get('password')?.value,
        email: this.signUpForm.get('email')?.value,
        firstname: this.signUpForm.get('firstname')?.value,
        lastname: this.signUpForm.get('lastname')?.value
      }

      this.userRegistrationSubscription =
        this.authService.registerUser(userToRegister)
          .subscribe((registeredUser: IUserDTO) => {
            this.userNameToRegister  = registeredUser.username;
          });
    }
  }
}
