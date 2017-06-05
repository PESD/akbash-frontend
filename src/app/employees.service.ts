import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';

@Injectable()
export class EmployeesService {
  private employeesURL = 'http://10.127.0.202/api/employee/?format=json';

  constructor(private http: Http) { }

  getEmployees(): Promise<Employee[]> {
/*    return this.http.get(this.employeesURL)
      .toPromise()
      .then(response => response.json().data as Employee[])
      .catch(this.handleError);
  } */

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
    console.log(options)
    return this.http.get(this.employeesURL, options)
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
