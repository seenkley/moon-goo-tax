import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationLogin } from './application-login'

@Injectable({
  providedIn: 'root'
})
export class EveLoginService {

  configUrl = '../assets/application-logins.json'

  constructor(private http: HttpClient) { }

  ngOnInit() {

    console.log(this.getSettings);
    
    // this.login();
  }
  
  getSettings() {
    return this.http.get<ApplicationLogin>(this.configUrl);
  }

  // login() {
  //     const endPoint = 'https://login.eveonline.com/v2/oauth/authorize/';
  //     return this.http.get(endPoint).map((response: Response) => response);
  // }

}
