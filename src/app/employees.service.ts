import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { AuthHeaders } from './authheaders';

@Injectable()
export class EmployeesService {
  //private employeesURL = 'http://10.127.0.202/api/employee/?format=json';
  private employeesURL = 'http://10.127.0.202/api/employee-no-workflow/?format=json';

  constructor(private http: Http) { }

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
      .catch(this.handleError);
    }

    getEmployee(person_id: string): Promise<Employee> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `http://10.127.0.202/api/employee/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as Employee;
          console.log(`Got Employee ID: ${e.id}`);
          return e;
        })
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
