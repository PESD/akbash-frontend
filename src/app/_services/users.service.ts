import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from '../_models/user';
import { AuthHeaders } from '../_helpers/authheaders';

import { Globals } from '../global';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getUserFromUsername(): Promise<User> {
    var username = "";
    if (localStorage.currentUser) {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      username = currentUser["username"]
    let url = `${Globals.BASE_API_URL}/bpm/user-from-username/${username}/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        let users = response.json() as User[];
        let user: User = users[0];
        console.log(user.username)
        return user;
      })
      .catch(this.handleError);
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
