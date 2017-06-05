import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Token } from './token';

@Injectable()
export class LoginService {
  private loginURL = 'http://10.127.0.202/api-token-auth/?format=json';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  constructor(private http: Http) { }

  getLogin(username: string, password: string): Promise<Token[]> {
    return this.http.post(this.loginURL, JSON.stringify({ username: username, password: password }), this.options)
      .toPromise()
      .then(response => response.json() as Token[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
