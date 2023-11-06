import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {noWhiteSpaceValidator} from "../../validators/no-white-space-validator.directive";
import {CredentialsDTO} from "../../types/custom-interfaces";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        'userName': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()]),
        'password': new FormControl<string>('', [Validators.required, noWhiteSpaceValidator()])
    });


  }

  onLogInFormSubmitted() {
    if(this.loginForm.valid){
      const uName: string = this.loginForm.get('userName')?.value;
      const uPassword: string = this.loginForm.get('password')?.value;

      const userCredentials: CredentialsDTO = {
        username: uName,
        password: uPassword
      }
      this.authService.submitUsernameAndPassword(userCredentials).subscribe( loginStatus =>{
        if(loginStatus){
          this.authService.userLoggedIn.next(loginStatus);
          this.router.navigate(['/routines']);
        }
      });
    }
  }
}
