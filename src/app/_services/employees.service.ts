import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee, Position } from '../_models/api.model';
import { AuthHeaders } from '../_helpers/authheaders';
import { HttperrorService } from './httperror.service';

import { Globals } from '../global';

@Injectable()
export class EmployeesService {
  //private employeesURL = 'http://10.127.0.202/api/employee/?format=json';
  private employeesURL = `${Globals.BASE_API_URL}/api/employee-no-workflow/?format=json`;

  constructor(private http: Http, private httperrorService: HttperrorService) { }

  getEmployees(): Promise<Employee[]> {
/*    return this.http.get(this.employeesURL)
      .toPromise()
      .then(response => response.json().data as Employee[])
      .catch(this.handleError);
  } */

    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    console.log(options)
    return this.http.get(this.employeesURL, options)
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(error => {
        return this.handleError(error)
      });
    }

    getEmployee(person_id: string): Promise<Employee> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/employee/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as Employee;
          //console.log(e);
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getPositions(person_id: string): Promise<Position[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/position-from-person/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let p = response.json() as Position[];
          //console.log(e);
          return p;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    updateEmployee(person: Employee) {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/employee/${person.id}/?format=json`;

      console.log(JSON.stringify(person))

      return this.http.put(url, JSON.stringify(person), options)
        .toPromise()
        .then(response => {
          let e = response.json() as Employee;
          console.log("Sent data")
          console.log(JSON.stringify(e));
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      this.httperrorService.raiseHttpError("Trouble connecting to API server");
      return Promise.reject(error.message || error);
    }

}
