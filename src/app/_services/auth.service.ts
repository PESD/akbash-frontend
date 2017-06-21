import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromPromise';

import { LoginService }      from './login.service';
import { Token } from '../_models/token'

@Injectable()
export class AuthService {

  constructor(private loginService: LoginService) { }

  isLoggedIn: boolean = false;
  token: Token;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    console.log("Going to send username & password");
    return Observable.fromPromise(this.loginService.getLogin(username, password).then((token) => {
      console.log("Okay, sent the username. Going to see if valid");
      this.token = token;
      if(this.token) {
        this.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token["token"] }));
        return true;
      }
      console.log("Username is invalid :sadface")
      console.log(token)
      return false;
    }));

  }

  loginObserve(): Observable<boolean> {
    return Observable.of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log("Log out got called on service")
  }

}
