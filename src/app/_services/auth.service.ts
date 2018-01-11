import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/delay";
import "rxjs/add/observable/fromPromise";

import { LoginService } from "./login.service";
import { Token } from "../_models/token";

// Service for handling Tandem user authentication
@Injectable()
export class AuthService {
  constructor(private loginService: LoginService) {}

  isLoggedIn: boolean = false;
  token: Token;
  loggedInSubject: Subject<boolean> = new Subject<boolean>();

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<boolean> {
    return Observable.fromPromise(
      this.loginService.getLogin(username, password).then(token => {
        this.token = token;
        if (this.token) {
          this.isLoggedIn = true;
          // Sets "currentUser" in local storage with a JSON object containing username and token.
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ username: username, token: token["token"] })
          );
          this.loggedInSubject.next(true);
          return true;
        }
        return false;
      })
    );
  }

  loginObserve(): Observable<boolean> {
    return Observable.of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.loggedInSubject.next(false);
    console.log("Log out got called on service");
  }
}
