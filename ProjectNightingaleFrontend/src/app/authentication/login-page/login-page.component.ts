import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
        'userName': new FormControl<string>(''),
        'password': new FormControl<string>('')
    })
  }

  onLogInFormSubmitted() {

  }
}
