import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

export const canActivateAuthenticatedRoutes: CanActivateFn = (route, state) =>{
  const authService =  inject(AuthenticationService);
  return !!authService.getAuthToken();
};


export const canActivateRegistrationAuthenticationUrls: CanActivateFn = (route,state) =>{
  return !!(route.queryParams['token'] || route.queryParams['code']);
}
