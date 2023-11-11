import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {IUserDTO} from "../types/authentication-interfaces";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{

  isAuthenticated: boolean = false;
  private userAuthenticationSubscription: Subscription;
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userAuthenticationSubscription = this.authService.authenticatedUser
      .subscribe((user: IUserDTO | null) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy() {
    if(this.userAuthenticationSubscription){
      this.userAuthenticationSubscription.unsubscribe();
    }
  }

}
