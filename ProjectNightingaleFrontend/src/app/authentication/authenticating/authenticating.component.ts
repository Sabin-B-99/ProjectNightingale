import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription, switchMap} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-authenticating',
  templateUrl: './authenticating.component.html',
  styleUrls: ['./authenticating.component.css']
})
export class AuthenticatingComponent implements OnInit, OnDestroy{

  private authenticationSubscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationSubscription = this.route.queryParams.pipe(switchMap(queryParam => {
      this.authService.setAuthorizationCode(queryParam['code']);
      return this.authService.getJWTToken();
    })).subscribe(jwtTokenResponse => {
      this.authService.saveAccessAndRefreshToken(jwtTokenResponse.access_token, jwtTokenResponse.refresh_token);
      this.router.navigate(['../songs'], {relativeTo: this.route});
    });
  }

  ngOnDestroy() {
    if(this.authenticationSubscription){
      this.authenticationSubscription.unsubscribe();
    }
  }
}
