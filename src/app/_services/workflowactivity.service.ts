import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { AuthHelper } from "../_helpers/authhelper";
import { WorkflowActivity } from "../_models/bpm.model";
import {
  TaskEparSubmission,
  TaskVisionsIDSubmission,
  TaskEmployeeADSubmission,
  TaskSubADSubmission,
  TaskEmployeeSynergySubmission,
  TaskSubSynergySubmission,
  TaskVisionsPositionSubmission,
  TaskGenericCheckSubmission,
  TaskGenericTodoSubmission,
  TaskAssignLocationsSubmission
} from "../_models/task_submissions";
import { Epar, VisionsEmployee } from "../_models/visions.model";
import { HttperrorService } from "./httperror.service";

import { Globals } from "../global";

// A Service for interacting with WorkflowActivities and Tasks.
// Also includes some methods for getting Visions data from Akbash. (Move to own service?)
@Injectable()
export class WorkflowactivityService {
  constructor(private http: Http, private httperrorService: HttperrorService) {}

  getWorkflowActivity(workflow_id: string): Promise<WorkflowActivity[]> {
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/bpm/workflowactivity-active-workflow/${workflow_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as WorkflowActivity[])
      .catch(error => {
        return this.handleError(error);
      });
  }

  // Methods for interacting with Tasks
  taskSetEpar(
    taskEparSubmission: TaskEparSubmission
  ): Promise<TaskEparSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_epar_id/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEparSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEparSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskSetVisionsID(
    taskVisionsIDSubmission: TaskVisionsIDSubmission
  ): Promise<TaskVisionsIDSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_set_visions_id/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskVisionsIDSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskVisionsIDSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskCheckEmployeeAD(
    taskEmployeeADSubmission: TaskEmployeeADSubmission
  ): Promise<TaskEmployeeADSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_check_employee_ad/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEmployeeADSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEmployeeADSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskSetSubAD(
    taskSubADSubmission: TaskSubADSubmission
  ): Promise<TaskSubADSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_check_employee_ad/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskSubADSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskSubADSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskCheckEmployeeSynergy(
    taskEmployeeSynergySubmission: TaskEmployeeSynergySubmission
  ): Promise<TaskEmployeeSynergySubmission> {
    let url = `${
      Globals.BASE_API_URL
    }/bpm/task_check_employee_synergy/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskEmployeeSynergySubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskEmployeeSynergySubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskSetSubSynergy(
    taskSubSynergySubmission: TaskSubSynergySubmission
  ): Promise<TaskSubSynergySubmission> {
    let url = `${
      Globals.BASE_API_URL
    }/bpm/task_check_employee_synergy/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskSubSynergySubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskSubSynergySubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskUpdateVisionsPositions(
    taskVisionsPositionSubmission: TaskVisionsPositionSubmission
  ): Promise<TaskVisionsPositionSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_update_position/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskVisionsPositionSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskVisionsPositionSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskGenericCheck(
    taskGenericCheckSubmission: TaskGenericCheckSubmission
  ): Promise<TaskGenericCheckSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_generic_check/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskGenericCheckSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskGenericCheckSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskGenericTodo(
    taskGenericTodoSubmission: TaskGenericTodoSubmission
  ): Promise<TaskGenericTodoSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_generic_todo/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskGenericTodoSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskGenericTodoSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  taskAssignLocations(
    taskAssignLocationsSubmission: TaskAssignLocationsSubmission
  ): Promise<TaskAssignLocationsSubmission> {
    let url = `${Globals.BASE_API_URL}/bpm/task_work_locations/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();
    let body = JSON.stringify(taskAssignLocationsSubmission);

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => response.json() as TaskAssignLocationsSubmission)
      .catch(error => {
        return this.handleError(error);
      });
  }

  // Methods for interacting with Akbash Visions data
  getEpar(epar_id: string): Promise<Epar> {
    let url = `${Globals.BASE_API_URL}/bpm/epar/${epar_id}/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as Epar)
      .catch(this.handleError);
  }

  getVisionsEmployee(visions_id: string): Promise<VisionsEmployee> {
    let url = `${
      Globals.BASE_API_URL
    }/bpm/visions-employee/${visions_id}/?format=json`;
    let authHeaders = new AuthHelper();
    let options = authHeaders.getRequestOptions();

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => response.json() as VisionsEmployee)
      .catch(error => {
        return this.handleError(error);
      });
  }

  handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    this.httperrorService.raiseHttpError("Trouble connecting to API server");
    return Promise.reject(error.message || error);
  }
}
