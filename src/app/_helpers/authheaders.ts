import { Headers, RequestOptions } from '@angular/http';
import { Token } from '../_models/token';

export class AuthHeaders {
  public getRequestOptions(): RequestOptions {
    var options: RequestOptions;
    if (localStorage.currentUser) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("Current User is: " + currentUser);
      let token = currentUser["token"];
      console.log("This user token is: " + token);
      var headers = new Headers({ 'Authorization': 'JWT ' + token });
      headers.append('Content-Type','application/json');
      options = new RequestOptions({ headers: headers });
    } else {
      options = new RequestOptions();
    }
    return options;
  }

  public getUsername(): string {
    if (localStorage.currentUser) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      return currentUser["username"];
    }
    return "";
  }

  public getToken(): Token {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var token = new Token();
    token.token = currentUser["token"];
    return token;
  }

  public setToken(token: Token) {
    if (localStorage.getItem("currentUser")) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let username = currentUser["username"];
      localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token.token }));
    }
  }
}
