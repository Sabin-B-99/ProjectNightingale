import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {IUserDTO} from "../types/authentication-interfaces";
import {Subscription, take} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  userAuthenticationSub: Subscription;
  username: string | null | undefined;
  constructor(private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.userAuthenticationSub = this.authService.authenticatedUser
      .subscribe((user: IUserDTO | null) =>{
        this.username = user?.username;
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    if(this.userAuthenticationSub){
      this.userAuthenticationSub.unsubscribe();
    }
  }

  redirectToUserLogin() {
    this.authService.redirectToAuthServerUrl();
  }

  logout() {
    this.authService.onLogout();
  }
}
