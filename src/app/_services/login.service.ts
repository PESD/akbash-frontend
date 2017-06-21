import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Token } from '../_models/token';
import { AuthHeaders } from '../_helpers/authheaders';
import { HttperrorService } from './httperror.service';

import { Globals } from '../global';

@Injectable()
export class LoginService {
  private loginURL = `${Globals.BASE_API_URL}/api-token-auth/?format=json`;
  private refreshURL = `${Globals.BASE_API_URL}/api-token-refresh/?format=json`;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http, private httperrorService: HttperrorService) { }

  getLogin(username: string, password: string): Promise<Token[]> {
    return this.http.post(this.loginURL, JSON.stringify({ username: username, password: password }), this.options)
      .toPromise()
      .then(response => response.json() as Token[])
      .catch(error => {
        return this.handleError(error)
      });
  }

  getRefreshedToken(): Promise<Token> {
    let authHeaders = new AuthHeaders();
    let token = authHeaders.getToken();
    return this.http.post(this.refreshURL, JSON.stringify(token), this.options)
      .toPromise()
      .then(response => response.json() as Token)
      .catch(error => {
        return this.handleError(error)
      });
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    //this.httperrorService.raiseHttpError("Trouble connecting to API server");
    return Promise.reject(error.message || error);
  }

}
