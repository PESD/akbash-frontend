import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Workflow, Process, WorkflowWithActivity, WorkflowCreate, DashboardStats, Graph } from '../_models/bpm.model';
import { TreeNode } from 'primeng/primeng';
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

  getProcessesByCategory(category: string): Promise<Process[]> {
    let url = `${Globals.BASE_API_URL}/bpm/process-by-category/${category}/?format=json`;
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
    } else if (type == 3) {
      url = `${Globals.BASE_API_URL}/bpm/workflow-complete-completed/?format=json`;
      return this.getWorkflows(url);
    } else if (type == 4) {
      url = `${Globals.BASE_API_URL}/bpm/workflow-complete-canceled/?format=json`;
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

  getWorkflowTreeNode(workflow_id: string): Promise<TreeNode[]> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/bpm/wwa/${workflow_id}/?format=json`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as TreeNode[])
      .catch(error => {
        return this.handleError(error)
      });
  }

  getDashboardStats(): Promise<DashboardStats> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let username = this.authHeaders.getUsername();

    let url = `${Globals.BASE_API_URL}/bpm/dashboard-stats/${username}/?format=json`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as DashboardStats)
      .catch(error => {
        return this.handleError(error)
      });
  }

  getGraphProcess(): Promise<Graph> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/bpm/graph-process/?format=json`;

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Graph)
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
