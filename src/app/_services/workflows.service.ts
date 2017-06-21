import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkflowCreate } from '../_models/bpm.model';
import { Workflow, Process } from '../_models/bpm.model';
import { AuthHeaders } from '../_helpers/authheaders';
import { UsersService }      from './users.service';
import { HttperrorService } from './httperror.service';

import { Globals } from '../global';

@Injectable()
export class WorkflowsService {
  authHeaders: AuthHeaders = new AuthHeaders;

  constructor(private http: Http, private usersService: UsersService, private httperrorService: HttperrorService) { }

  createWorkflow(workflowCreate: WorkflowCreate): Promise<WorkflowCreate> {
    let url = `${Globals.BASE_API_URL}/bpm/create_workflow/?format=json`;
    let options = this.authHeaders.getRequestOptions();
    let body = JSON.stringify(workflowCreate);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as WorkflowCreate)
      .catch(this.handleError);

  }

  getProcesses(): Promise<Process[]> {
    let url = `${Globals.BASE_API_URL}/bpm/process/?format=json`;
    let options = this.authHeaders.getRequestOptions();

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Process[])
      .catch(this.handleError);

  }

  getAllWorkflows(type: number): Promise<Workflow[]> {
    var url = "";
    if (type == 0) {
      let username = this.authHeaders.getUsername();
      console.log(`Username is ${username}`);
      let user_url = `${Globals.BASE_API_URL}/bpm/workflow-complete-active-user/${username}/?format=json`;
      return this.getWorkflows(user_url);
    } else if (type == 1) {
      url = `${Globals.BASE_API_URL}/bpm/workflow-complete-active/?format=json`;
      return this.getWorkflows(url);
    } else if (type == 2) {
      url = `${Globals.BASE_API_URL}/bpm/workflow-complete/?format=json`;
      return this.getWorkflows(url);
    }
  }

  getWorkflows(url: string): Promise<Workflow[]> {
    let options = this.authHeaders.getRequestOptions();
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Workflow[])
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
