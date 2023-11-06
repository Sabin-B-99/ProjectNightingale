import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit{

  private userAuthenticationSubscription: Subscription;
  public userIsAuthenticated: boolean = false;
  public username: string | null;
  constructor(private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.userAuthenticationSubscription = this.authService.userLoggedIn
      .subscribe(status => {
        this.userIsAuthenticated = status;
        this.username = this.authService.getUsername();
      });
  }
}
