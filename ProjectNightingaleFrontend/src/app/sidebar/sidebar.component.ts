import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  private userAuthenticationSubscription: Subscription;
  public userIsAuthenticated: boolean = false;
  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userAuthenticationSubscription = this.authService.userLoggedIn
      .subscribe(status => {
        console.log(status);
        this.userIsAuthenticated = status
      });
  }


}
