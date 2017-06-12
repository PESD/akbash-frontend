import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkflowCreate } from './workflowcreate';
import { WorkflowComplete } from './workflowcomplete';
import { AuthHeaders } from './authheaders';
import { UsersService }      from './users.service';

@Injectable()
export class WorkflowsService {
  authHeaders: AuthHeaders = new AuthHeaders;

  constructor(private http: Http, private usersService: UsersService) { }

  createWorkflow(workflowCreate: WorkflowCreate): Promise<WorkflowCreate> {
    let url = 'http://10.127.0.202/bpm/create_workflow/?format=json';
    let options = this.authHeaders.getRequestOptions();
    let body = JSON.stringify(workflowCreate);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as WorkflowCreate)
      .catch(this.handleError);

  }

  getAllWorkflows(type: number): Promise<WorkflowComplete[]> {
    var url = "";
    if (type == 0) {
      let username = this.authHeaders.getUsername();
      console.log(`Username is ${username}`);
      let user_url = 'http://10.127.0.202/bpm/workflow-complete-active-user/' + username + '/?format=json';
      return this.getWorkflows(user_url);
    } else if (type == 1) {
      url = 'http://10.127.0.202/bpm/workflow-complete-active/?format=json';
      return this.getWorkflows(url);
    } else if (type == 2) {
      url = 'http://10.127.0.202/bpm/workflow-complete/?format=json';
      return this.getWorkflows(url);
    }
  }

  getWorkflows(url: string): Promise<WorkflowComplete[]> {
    let options = this.authHeaders.getRequestOptions();

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as WorkflowComplete[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}