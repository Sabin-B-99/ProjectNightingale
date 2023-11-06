import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsDTO, UserRegistrationDTO} from "../types/custom-interfaces";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  submitUsernameAndPassword(credentials: CredentialsDTO){
    return this.http.post<CredentialsDTO>("http://localhost:8080/ProjectNightingale/api/auth/login", credentials)
      .pipe(map(credentials => {
        if(credentials.password){
          //the password here is JWT auth token. Don't confuse it with user password.
          this.setAuthToken(credentials.password);
          this.setUsername(credentials.username);
          return true;
        }
        return false;
      }));
  }

  registerUser(newUser: UserRegistrationDTO) {
   return this.http.post<UserRegistrationDTO>("http://localhost:8080/ProjectNightingale/api/auth/register", newUser)
     .pipe(map(credentials =>{
       if(credentials.password){
         this.setAuthToken(credentials.password);
         this.setUsername(credentials.username);
         return true;
       }
       return false;
     }));
  }

  getAuthToken(){
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null){
    if(token !== null){
      window.localStorage.setItem("auth_token", token);
    }else {
      window.localStorage.removeItem("auth_token");
    }
  }

  getUsername(){
    return window.localStorage.getItem("uName");
  }
  setUsername(username: string| null){
    if(username != null){
      window.localStorage.setItem("uName", username);
    }else {
      window.localStorage.removeItem("uName");
    }
  }
}
