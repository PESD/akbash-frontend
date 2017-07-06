export class TaskEparSubmission {
  workflow_task_id?: any;
  epar_id?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, epar_id: any) {
        this.workflow_task_id = workflow_task_id;
        this.epar_id = epar_id;
        this.status = false;
        this.message = "";
  }
}

export class TaskVisionsIDSubmission {
  workflow_task_id?: any;
  visions_id?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, epar_id: any) {
        this.workflow_task_id = workflow_task_id;
        this.visions_id = epar_id;
        this.status = false;
        this.message = "";
  }
}

export class TaskEmployeeADSubmission {
  workflow_task_id?: any;
  ad_username?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: any) {
        this.workflow_task_id = workflow_task_id;
        this.username = username;
        this.ad_username = "";
        this.status = false;
        this.message = "";
  }
}

export class TaskVisionsPositionSubmission {
  workflow_task_id?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number) {
        this.workflow_task_id = workflow_task_id;
        this.status = false;
        this.message = "";
  }
}
