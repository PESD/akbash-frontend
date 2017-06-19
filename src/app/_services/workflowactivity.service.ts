import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthHeaders } from '../_helpers/authheaders';
import { WorkflowActivity }      from '../_models/bpm.model';
import { TaskEparSubmission, TaskVisionsIDSubmission } from '../_models/task_submissions';

import { Globals } from '../global';

@Injectable()
export class WorkflowactivityService {

  constructor(private http: Http) { }

  getWorkflowActivity(workflow_id: string): Promise<WorkflowActivity[]> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/bpm/workflowactivity-active-workflow/${workflow_id}/?format=json`;

    console.log("GETTING SOME ACTIVITIES!... " + url );

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as WorkflowActivity[])
      .catch(this.handleError);
  }

  taskSetEpar(taskEparSubmission: TaskEparSubmission): Promise<TaskEparSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_epar_id/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEparSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEparSubmission)
      .catch(this.handleError);
  }

  taskSetVisionsID(taskVisionsIDSubmission: TaskVisionsIDSubmission): Promise<TaskVisionsIDSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_visions_id/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskVisionsIDSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskVisionsIDSubmission)
      .catch(this.handleError);
  }





    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
