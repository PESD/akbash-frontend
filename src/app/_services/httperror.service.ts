import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";

import { Httperror } from "../_models/httperror";

@Injectable()
export class HttperrorService {
  httperror: Subject<Httperror> = new Subject<Httperror>();

  constructor() {}

  raiseHttpError(msg: string) {
    let error = new Httperror();
    error.isError = true;
    error.errorMsg = msg;
    this.httperror.next(error);
  }
}
