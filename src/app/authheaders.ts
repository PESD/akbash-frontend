import { Headers, RequestOptions } from '@angular/http';

export class AuthHeaders {
  public getRequestOptions(): RequestOptions {
    var options: RequestOptions;
    if (localStorage.currentUser) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log("Current User is: " + currentUser);
      let token = currentUser["token"];
      console.log("This user token is: " + token);
      let headers = new Headers({ 'Authorization': 'JWT ' + token });
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
}
