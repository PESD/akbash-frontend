import { Injectable } from "@angular/core";
import { AuthHelper } from "../_helpers/authhelper";
import { HttperrorService } from "./httperror.service";
import { ModelLog } from "../_models/auditlog.model";

import { Headers, Http, RequestOptions } from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Globals } from "../global";

// Service for pulling data from the Akbash auditlog
@Injectable()
export class AuditlogService {
  constructor(private http: Http, private httperrorService: HttperrorService) {}

  getModelLogByPerson(person_id: string): Promise<ModelLog[]> {
    let authHelper = new AuthHelper();
    let options = authHelper.getRequestOptions();

    let url = `${
      Globals.BASE_API_URL
    }/auditlog/modellog-by-person/${person_id}/?format=json`;

    return this.http
      .get(url, options)
      .toPromise()
      .then(response => {
        let e = response.json() as ModelLog[];
        //console.log(e);
        return e;
      })
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
