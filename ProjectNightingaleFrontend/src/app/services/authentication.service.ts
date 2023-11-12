import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IJWTTokenResponse, IUserDTO, IUserRegistrationDTO} from "../types/authentication-interfaces";
import {Buffer} from "buffer";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

//TODO: create PKCE challanger and verifier
//TODO: Add method to refresh auth token on auth token expiry
export class AuthenticationService {
  private readonly clientId: string = 'ProjectNightingaleWebApp';
  private readonly clientSecret: string = '12345' //TODO: Don't keep it here later for production.
  private readonly authServerUrl: string = "http://localhost:9090/oauth2/authorize?response_type=code&client_id=ProjectNightingaleWebApp&scope=openid&redirect_uri=http://127.0.0.1:4200/authorized&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256"
  private authorizationCode: string;

  authenticatedUser: BehaviorSubject<IUserDTO | null> = new BehaviorSubject<IUserDTO | null>(null);

  constructor(private http: HttpClient, private router: Router) { }
   getAuthServerUrl(){
    return this.authServerUrl;
  }

  setAuthorizationCode(code: string){
    this.authorizationCode = code;
  }

  private getTokenUrl(){
    return this.buildJwtTokenUrl(this.authorizationCode);
  }

  private buildJwtTokenUrl(code: string): string{
    const redirectUri: string = `http://127.0.0.1:4200/authorized&code=${code}&grant_type=authorization_code&code_verifier=qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI&scope=openid`;
    return `http://localhost:9090/oauth2/token?client_id=ProjectNightingaleWebApp&redirect_uri=${redirectUri}`;
  }

  getJWTToken(){
    const tokenUrl: string = this.getTokenUrl();

    const clientAuthDetails: string = `Basic ` + Buffer.from(`${this.clientId}:${this.clientSecret}`)
      .toString('base64');

    const header: HttpHeaders = new HttpHeaders()
      .append('content-type', 'application/json')
      .append('Authorization', clientAuthDetails)


    return this.http.post<IJWTTokenResponse>(tokenUrl, null, {
      headers: header
    });
  }

  private saveJWTTokenInfo(jwtToken: IJWTTokenResponse){
    window.localStorage.setItem('auth_token', jwtToken.access_token);
    window.localStorage.setItem('refresh_token', jwtToken.refresh_token);
    const expiryTime: number = Math.floor(Date.now() / 1000) + +jwtToken.expires_in;
    window.localStorage.setItem('expiry_time', expiryTime.toString());
  }

  registerUser(userToRegister: IUserRegistrationDTO) {
    return this.http.post<IUserDTO>('http://localhost:8080/ProjectNightingale/api/users/register', userToRegister);
  }

  confirmRegistration(token: string) {
    return this.http.post<IUserDTO>('http://localhost:8080/ProjectNightingale/api/users/confirm', token);
  }

  private persistAuthenticatedUserInfo(token: IJWTTokenResponse) {
    const decodedToken:JwtPayload = jwtDecode(token.access_token);
    if(decodedToken.sub){
      window.localStorage.setItem('username', decodedToken.sub )
      this.authenticatedUser.next(this.getAuthenticatedUserInfo());
    }
  }

  private getAuthenticatedUserInfo(): IUserDTO{
    const user: string | null = window.localStorage.getItem('username');
    return {
      username: user || ''
    }
  }

  onLogout() {
    window.localStorage.removeItem('auth_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('expiry_time');
    window.localStorage.removeItem('username');
    this.authenticatedUser.next(null);
    this.router.navigate(['/songs'])
  }

  getAuthToken() {
    const expiryTime: string | null = window.localStorage.getItem('expiry_time');
    let currentTime: number = Math.floor(Date.now() / 1000);
    if(expiryTime && currentTime < +expiryTime){
      return window.localStorage.getItem('auth_token');
    }
    return null;
  }

  redirectToAuthServerUrl() {
    window.location.href = this.getAuthServerUrl();
  }

  autoLogin() {
    if(this.getAuthToken()){
      this.authenticatedUser.next(this.getAuthenticatedUserInfo());
    }
  }

  saveLoginInfo(jwtTokenResponse: IJWTTokenResponse) {
    this.saveJWTTokenInfo(jwtTokenResponse);
    this.persistAuthenticatedUserInfo(jwtTokenResponse);
  }
}
