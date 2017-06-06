import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { WorkflowCreate } from './workflowcreate';
import { WorkflowComplete } from './workflowcomplete';
import { AuthHeaders } from './authheaders';

@Injectable()
export class WorkflowsService {

  constructor(private http: Http) { }

  createWorkflow(workflowCreate: WorkflowCreate): Promise<WorkflowCreate> {
    let url = 'http://10.127.0.202/bpm/create_workflow/?format=json';
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(workflowCreate);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as WorkflowCreate)
      .catch(this.handleError);

  }

  getAllWorkflows(): Promise<WorkflowComplete[]> {
    let url = 'http://10.127.0.202/bpm/workflow-complete/?format=json';
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

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
