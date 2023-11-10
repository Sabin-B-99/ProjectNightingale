import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IJWTTokenResponse, IUserDTO, IUserRegistrationDTO} from "../types/authentication-interfaces";
import {Buffer} from "buffer";

@Injectable({
  providedIn: 'root'
})

//TODO: create PKCE challanger and verifier
export class AuthenticationService {
  private readonly clientId: string = 'ProjectNightingaleWebApp';
  private readonly clientSecret: string = '12345' //TODO: Don't keep it here later for production.
  private readonly authServerUrl: string = "http://localhost:9090/oauth2/authorize?response_type=code&client_id=ProjectNightingaleWebApp&scope=openid&redirect_uri=http://127.0.0.1:4200/authorized&code_challenge=QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8&code_challenge_method=S256"
  private authorizationCode: string;



  constructor(private http: HttpClient) { }
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

  public saveAccessAndRefreshToken(accessToken: string, refreshToken: string){
    window.sessionStorage.setItem('auth_token', accessToken);
    window.sessionStorage.setItem('refresh_token', refreshToken);
  }

  registerUser(userToRegister: IUserRegistrationDTO) {
    return this.http.post<IUserDTO>('http://localhost:8080/ProjectNightingale/api/users/register', userToRegister);
  }

  confirmRegistration(token: string) {
    return this.http.post<IUserDTO>('http://localhost:8080/ProjectNightingale/api/users/confirm', token);
  }
}
