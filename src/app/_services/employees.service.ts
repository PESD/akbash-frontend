import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Employee, Position, Vendor, Location, Contractor, Person, Comment, PersonSkinny, VisionsPosition } from '../_models/api.model';
import { WorkflowCreate, Process } from '../_models/bpm.model';
import { AuthHeaders } from '../_helpers/authheaders';
import { HttperrorService } from './httperror.service';
import { WorkflowsService } from './workflows.service';

import { Globals } from '../global';

@Injectable()
export class EmployeesService {
  //private employeesURL = 'http://10.127.0.202/api/employee/?format=json';
  private employeesURL = `${Globals.BASE_API_URL}/api/employee-no-workflow/?format=json`;

  constructor(private http: Http, private httperrorService: HttperrorService, private workflowsService: WorkflowsService) { }

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

    getPersonsbyType(personType: string): Promise<PersonSkinny[]> {
      let url = "";
      if (personType == "Contractor") {
        url = `${Globals.BASE_API_URL}/api/person-all-contractors/?format=json`;
      } else {
        url = `${Globals.BASE_API_URL}/api/person-all-employees/?format=json`;
      }
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as PersonSkinny[];
          //console.log(e);
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getPersonFromWorkflow(workflow_id: string): Promise<PersonSkinny[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/person-from-workflow/${workflow_id}/?format=json`;
      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as PersonSkinny[];
          //console.log(e);
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getPersonMissedStartDate(): Promise<PersonSkinny[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/person-missed-start-date/?format=json`;
      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as PersonSkinny[];
          //console.log(e);
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getPerson(person_id: string): Promise<Person> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/person/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as Person;
          //console.log(e);
          return e;
        })
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

    getContractor(person_id: string): Promise<Contractor> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/contractor/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as Contractor;
          //console.log(e);
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getVendor(vendor_id: string): Promise<Vendor> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/vendor/${vendor_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let e = response.json() as Vendor;
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

    getVisionsPositions(): Promise<VisionsPosition[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/visionspositions/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let p = response.json() as VisionsPosition[];
          //console.log(e);
          return p;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getVendors(): Promise<Vendor[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/vendor/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => {
          let v = response.json() as Vendor[];
          //console.log(e);
          return v;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    getLocations(): Promise<Location[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/location/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => response.json() as Location[])
        .catch(error => {
          return this.handleError(error)
        });
    }

    getLocationsFromPerson(person_id: string): Promise<Location[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/location-from-person/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => response.json() as Location[])
        .catch(error => {
          return this.handleError(error)
        });
    }

    getLocationsNotFromPerson(person_id: string): Promise<Location[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/location-not-from-person/${person_id}/?format=json`;
      console.log(url)

      return this.http.get(url, options)
        .toPromise()
        .then(response => response.json() as Location[])
        .catch(error => {
          return this.handleError(error)
        });
    }

    updatePerson(person: Person) {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();

      let url = `${Globals.BASE_API_URL}/api/person/${person.id}/?format=json`;

      console.log(JSON.stringify(person))

      return this.http.put(url, JSON.stringify(person), options)
        .toPromise()
        .then(response => {
          let e = response.json() as Person;
          console.log("Sent data")
          console.log(JSON.stringify(e));
          return e;
        })
        .catch(error => {
          return this.handleError(error)
        });
    }

    saveContractor(contractor: Contractor): Promise<Contractor> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();
      let url = `${Globals.BASE_API_URL}/api/contractor/?format=json`;
      let body = JSON.stringify(contractor);
      console.log(body);

      return this.http.post(url, body, options)
        .toPromise()
        .then(response => response.json() as Contractor)
        .catch(this.handleError);
    }

    savePosition(position: Position): Promise<Position> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();
      let url = `${Globals.BASE_API_URL}/api/position/?format=json`;
      let body = JSON.stringify(position);
      console.log(body)
      return this.http.post(url, body, options)
        .toPromise()
        .then(response => response.json() as Position)
        .catch(this.handleError);
    }

    saveContractorWithPositions(contractor: Contractor, positions: Position[]){
      this.saveContractor(contractor).then(contractor => {
        let processID: string;
        this.workflowsService.getProcesses().then(processes => {
          processID = this.getContractorProcessID(processes)
          let workflowCreate = new WorkflowCreate(processID, contractor.id.toString())
          this.workflowsService.createWorkflow(workflowCreate)
        });
        for (let position of positions) {
          position.person = contractor.id;
          this.savePosition(position);
        }
      });
    }

    getContractorProcessID(processes: Process[]): string {
        for (let process of processes) {
          if (process.name.indexOf("Contractor") >= 0) {
            return process.id.toString();
          }
        }
        return null
    }

    getCommentsByPerson(person_id: string): Promise<Comment[]> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();
      let url = `${Globals.BASE_API_URL}/api/comment-from-person/${person_id}/?format=json`;

      return this.http.get(url, options)
        .toPromise()
        .then(response => response.json() as Comment[])
        .catch(error => {
          return this.handleError(error)
        });

    }

    saveComment(comment: Comment): Promise<Comment> {
      let authHeaders = new AuthHeaders;
      let options = authHeaders.getRequestOptions();
      let url = `${Globals.BASE_API_URL}/api/comment/?format=json`;
      let body = JSON.stringify(comment);

      return this.http.post(url, body, options)
        .toPromise()
        .then(response => response.json() as Comment)
        .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      this.httperrorService.raiseHttpError("Trouble connecting to API server");
      return Promise.reject(error.message || error);
    }

}
