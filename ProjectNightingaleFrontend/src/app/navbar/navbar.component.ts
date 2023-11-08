import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent implements OnInit{

  constructor(private authService: AuthenticationService) {
  }
  ngOnInit(): void {

  }

  redirectToUserLogin() {
    window.location.href = this.authService.getAuthServerUrl();
  }
}
