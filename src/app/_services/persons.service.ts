import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";

import "rxjs/add/operator/toPromise";

import {
  Employee,
  Position,
  Vendor,
  Location,
  Contractor,
  Person,
  Comment,
  PersonSkinny,
  VisionsPosition
} from "../_models/api.model";
import { WorkflowCreate, Process } from "../_models/bpm.model";
import { AuthHelper } from "../_helpers/authhelper";
import { HttperrorService } from "./httperror.service";
import { WorkflowsService } from "./workflows.service";

import { Globals } from "../global";

// A Service to handle interacting with different Person type objects in the Akbash API.
// This is includes Person, Employee, and Contractor
@Injectable()
export class PersonsService {
  private employeesURL = `${
    Globals.BASE_API_URL
  }/api/employee-new-hire-no-workflow/?format=json`;

  constructor(
    private http: Http,
    private httperrorService: HttperrorService,
    private workflowsService: WorkflowsService
  ) {}

  getEmployees(): Promise<Employee[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    return this.http
      .get(this.employeesURL, options)
      .toPromise()
      .then(response => response.json() as Employee[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  getPersonsbyType(personType: string): Promise<PersonSkinny[]> {
    let url = "";
    if (personType == "Contractor") {
      url = `${Globals.BASE_API_URL}/api/person-all-contractors/?format=json`;
    } else if (personType == "Sub") {
      url = `${Globals.BASE_API_URL}/api/person-all-subs/?format=json`;
    } else {
      url = `${Globals.BASE_API_URL}/api/person-all-employees/?format=json`;
    }
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as PersonSkinny[];
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getPersonFromWorkflow(workflow_id: string): Promise<PersonSkinny[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/person-from-workflow/${workflow_id}/?format=json`;
    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as PersonSkinny[];
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getPersonMissedStartDate(): Promise<PersonSkinny[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/person-missed-start-date/?format=json`;
    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as PersonSkinny[];
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getPerson(person_id: string): Promise<Person> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as Person;
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getEmployee(person_id: string): Promise<Employee> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/employee/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as Employee;
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getContractor(person_id: string): Promise<Contractor> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/contractor/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as Contractor;
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getVendor(vendor_id: string): Promise<Vendor> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/vendor/${vendor_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as Vendor;
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getPositions(person_id: string): Promise<Position[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/position-from-person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let p = response.json() as Position[];
        return p;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getVisionsPositions(): Promise<VisionsPosition[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/visionspositions/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let p = response.json() as VisionsPosition[];
        return p;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getVendors(): Promise<Vendor[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/vendor/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let v = response.json() as Vendor[];
        return v;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getLocations(): Promise<Location[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/location/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Location[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  getLocationsFromPerson(person_id: string): Promise<Location[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/location-from-person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Location[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  getLocationsNotFromPerson(person_id: string): Promise<Location[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/api/location-not-from-person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Location[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  updatePerson(person: Person) {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/api/person/${person.id}/?format=json`;

    return this.http
      .put(url, JSON.stringify(person), options)
      .toPromise()
      .then(response => {
        let e = response.json() as Person;
        return e;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  saveContractor(contractor: Contractor): Promise<Contractor> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let url = `${Globals.BASE_API_URL}/api/contractor/?format=json`;
    let body = JSON.stringify(contractor);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as Contractor)
      .catch(error => {
        return this.handleContractorError(error);
      });
  }

  savePosition(position: Position): Promise<Position> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let url = `${Globals.BASE_API_URL}/api/position/?format=json`;
    let body = JSON.stringify(position);
    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as Position)
      .catch(this.handleError);
  }

  saveContractorNew(
    contractor: Contractor,
    positions: Position[]
  ): Promise<boolean> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let url = `${Globals.BASE_API_URL}/api/contractor/?format=json`;
    let body = JSON.stringify(contractor);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => {
        contractor = response.json() as Contractor;
        let promises = [];
        let processID: string;
        promises.push(
          this.workflowsService.getProcesses().then(processes => {
            let processID = this.getContractorProcessID(processes);
            let workflowCreate = new WorkflowCreate(
              processID,
              contractor.id.toString()
            );
            this.workflowsService.createWorkflow(workflowCreate);
          })
        );
        for (let position of positions) {
          position.person = contractor.id;
          promises.push(this.savePosition(position));
        }
        return Promise.all(promises)
          .then(value => {
            return true;
          })
          .catch(error => {
            return false;
          });
      })
      .catch(error => {
        return this.handleContractorError(error);
      });
  }

  saveContractorWithPositions(contractor: Contractor, positions: Position[]) {
    this.saveContractor(contractor).then(contractor => {
      let processID: string;
      this.workflowsService.getProcesses().then(processes => {
        processID = this.getContractorProcessID(processes);
        let workflowCreate = new WorkflowCreate(
          processID,
          contractor.id.toString()
        );
        this.workflowsService.createWorkflow(workflowCreate);
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
    return null;
  }

  getCommentsByPerson(person_id: string): Promise<Comment[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let url = `${
      Globals.BASE_API_URL
    }/api/comment-from-person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Comment[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  saveComment(comment: Comment): Promise<Comment> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let url = `${Globals.BASE_API_URL}/api/comment/?format=json`;
    let body = JSON.stringify(comment);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as Comment)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    this.httperrorService.raiseHttpError("Trouble connecting to API server");
    return Promise.reject(error.message || error);
  }

  handleContractorError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    let message: string = "";
    let obj = error.json();
    for (let key in obj) {
      message = message + key + ": ";
      let value = obj[key];
      if (value instanceof Array) {
        for (let item of value) {
          if (typeof item === "string") {
            message = message + item + " ";
          }
        }
      }
    }
    this.httperrorService.raiseHttpError("Error Adding Contractor: " + message);
    return Promise.reject(error.message || error);
  }
}
