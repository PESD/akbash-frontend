import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthHeaders } from './authheaders';
import { WorkflowActivity }      from './workflowcomplete';

@Injectable()
export class WorkflowactivityService {

  constructor(private http: Http) { }

  getWorkflowActivity(workflow_id: string): Promise<WorkflowActivity[]> {
    let authHeaders = new AuthHeaders;
    let options = authHeaders.getRequestOptions();

    let url = `http://10.127.0.202/bpm/workflowactivity-active-workflow/${workflow_id}/?format=json`;

    console.log("GETTING SOME ACTIVITIES!... " + url );

    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as WorkflowActivity[])
      .catch(this.handleError);
  }





    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
