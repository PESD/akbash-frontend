import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromPromise';

import { LoginService }      from './login.service';
import { Token } from './token'

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
        console.log("Username is valid!");
        console.log(token["token"])
        console.log("This is logged in:");
        console.log(this.isLoggedIn);
        this.isLoggedIn = true;
        console.log("Now it is set to:");
        console.log(this.isLoggedIn);
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token["token"] }));
        console.log("Local Storage now set. Going to return True");
        return true;
      }
      console.log("Username is invalid :sadface")
      console.log(token)
      return false;
    }));

    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  loginObserve(): Observable<boolean> {
    return Observable.of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log("Log out got called on service")
  }

}
