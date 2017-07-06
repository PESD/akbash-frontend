import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthHeaders } from '../_helpers/authheaders';
import { WorkflowActivity }      from '../_models/bpm.model';
import { TaskEparSubmission, TaskVisionsIDSubmission, TaskEmployeeADSubmission, TaskVisionsPositionSubmission } from '../_models/task_submissions';
import { Epar, VisionsEmployee } from '../_models/visions.model';
import { HttperrorService } from './httperror.service';

import { Globals } from '../global';

@Injectable()
export class WorkflowactivityService {

  constructor(private http: Http, private httperrorService: HttperrorService) { }

  getWorkflowActivity(workflow_id: string): Promise<WorkflowActivity[]> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    let url = `${Globals.BASE_API_URL}/bpm/workflowactivity-active-workflow/${workflow_id}/?format=json`;

    console.log("GETTING SOME ACTIVITIES!... " + url );

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as WorkflowActivity[])
      .catch(error => {
        return this.handleError(error)
      });
  }

  taskSetEpar(taskEparSubmission: TaskEparSubmission): Promise<TaskEparSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_epar_id/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEparSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEparSubmission)
      .catch(error => {
        return this.handleError(error)
      });
  }

  taskSetVisionsID(taskVisionsIDSubmission: TaskVisionsIDSubmission): Promise<TaskVisionsIDSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_visions_id/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskVisionsIDSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskVisionsIDSubmission)
      .catch(error => {
        return this.handleError(error)
      });
  }

  taskCheckEmployeeAD(taskEmployeeADSubmission: TaskEmployeeADSubmission): Promise<TaskEmployeeADSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_check_employee_ad/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEmployeeADSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEmployeeADSubmission)
      .catch(error => {
        return this.handleError(error)
      });
  }

  taskUpdateVisionsPositions(taskVisionsPositionSubmission: TaskVisionsPositionSubmission): Promise<TaskVisionsPositionSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_update_position/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskVisionsPositionSubmission);

    return this.http.post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskVisionsPositionSubmission)
      .catch(error => {
        return this.handleError(error)
      });
  }

  getEpar(epar_id: string): Promise<Epar> {
    let url = `${Globals.BASE_API_URL}/bpm/epar/${epar_id}/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Epar)
      .catch(this.handleError);
  }

  getVisionsEmployee(visions_id: string): Promise<VisionsEmployee> {
    let url = `${Globals.BASE_API_URL}/bpm/visions-employee/${visions_id}/?format=json`;
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as VisionsEmployee)
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
