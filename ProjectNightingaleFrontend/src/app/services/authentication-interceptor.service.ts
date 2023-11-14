import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken: string | null = this.authService.getAuthToken();
    if(authToken){
      const header: HttpHeaders = new HttpHeaders()
        .append('Authorization', `Bearer ${authToken}`);
      const modifiedReq: HttpRequest<any> = req.clone({
        headers: header
      });
      return next.handle(modifiedReq);
    }else {
      return next.handle(req);
    }
  }
}
