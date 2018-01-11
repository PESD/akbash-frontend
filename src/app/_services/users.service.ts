import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { User } from "../_models/user";
import { AuthHelper } from "../_helpers/authhelper";
import { HttperrorService } from "./httperror.service";

import { Globals } from "../global";

// A Service for handling Tandem users
@Injectable()
export class UsersService {
  constructor(private http: Http, private httperrorService: HttperrorService) {}

  getUserFromUsername(): Promise<User> {
    var username = "";
    if (localStorage.currentUser) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      username = currentUser["username"];
      let url = `${
        Globals.BASE_API_URL
      }/bpm/user-from-username/${username}/?format=json`;
      let authHeaders = new AuthHelper();
      let options = authHeaders.getRequestOptions();

      return this.http
        .get(url, options)
        .toPromise()
        .then(response => {
          let users = response.json() as User[];
          let user: User = users[0];
          console.log(user.username);
          return user;
        })
        .catch(error => {
          return this.handleError(error);
        });
    }
  }

  getUser(user_id): Promise<User> {
    let url = `${Globals.BASE_API_URL}/bpm/user/${user_id}/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let user = response.json() as User;
        return user;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    this.httperrorService.raiseHttpError("Trouble connecting to API server");
    return Promise.reject(error.message || error);
  }
}
