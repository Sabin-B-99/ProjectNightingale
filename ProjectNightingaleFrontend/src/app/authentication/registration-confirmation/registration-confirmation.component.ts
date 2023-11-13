import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IUserDTO} from "../../types/authentication-interfaces";

@Component({
  selector: 'app-registration-confirmation',
  templateUrl: './registration-confirmation.component.html',
  styleUrls: ['./registration-confirmation.component.css']
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy{

  private registrationConfirmationSubscription: Subscription;

  username: string | null;
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.registrationConfirmationSubscription = this.route.queryParams
      .pipe(switchMap((param: Params) => this.authService.confirmRegistration(param['token'])))
      .subscribe( (registeredUser: IUserDTO) => this.username = registeredUser.username);
  }

  ngOnDestroy() {
    if(this.registrationConfirmationSubscription){
      this.registrationConfirmationSubscription.unsubscribe();
    }
  }

}
