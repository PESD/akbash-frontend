export class TaskEparSubmission {
  workflow_task_id?: any;
  epar_id?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, epar_id: any, username: string) {
        this.workflow_task_id = workflow_task_id;
        this.epar_id = epar_id;
        this.status = false;
        this.message = "";
        this.username = username;
  }
}

export class TaskVisionsIDSubmission {
  workflow_task_id?: any;
  visions_id?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, epar_id: any, username: string) {
        this.workflow_task_id = workflow_task_id;
        this.visions_id = epar_id;
        this.status = false;
        this.message = "";
        this.username = username;
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

export class TaskSubADSubmission {
  workflow_task_id?: any;
  ad_username?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: any, ad_username: any) {
        this.workflow_task_id = workflow_task_id;
        this.username = username;
        this.ad_username = ad_username;
        this.status = false;
        this.message = "";
  }
}

export class TaskEmployeeSynergySubmission {
  workflow_task_id?: any;
  synergy_username?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: any) {
        this.workflow_task_id = workflow_task_id;
        this.username = username;
        this.synergy_username = "";
        this.status = true;
        this.message = "";
  }
}

export class TaskSubSynergySubmission {
  workflow_task_id?: any;
  synergy_username?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: any, synergy_username: any) {
        this.workflow_task_id = workflow_task_id;
        this.username = username;
        this.synergy_username = synergy_username;
        this.status = true;
        this.message = "";
  }
}

export class TaskVisionsPositionSubmission {
  workflow_task_id?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: string) {
        this.workflow_task_id = workflow_task_id;
        this.status = false;
        this.message = "";
        this.username = username;
  }
}

export class TaskGenericCheckSubmission {
  workflow_task_id?: any;
  username?: any;
  status?: any;
  message?: any;

  constructor(workflow_task_id: number, username: string) {
        this.workflow_task_id = workflow_task_id;
        this.status = false;
        this.message = "";
        this.username = username;
  }
}

export class TaskGenericTodoSubmission {
  workflow_task_id?: any;
  status?: any;
  message?: any;
  username?: any;

  constructor(workflow_task_id: number, username: string) {
        this.workflow_task_id = workflow_task_id;
        this.status = false;
        this.message = "";
        this.username = username;
  }
}

export class TaskAssignLocationsSubmission {
  workflow_task_id?: any;
  status?: any;
  message?: any;
  username?: any;
  locations?: any[];

  constructor(workflow_task_id: number, username: string, locations: number[]) {
        this.workflow_task_id = workflow_task_id;
        this.status = false;
        this.message = "";
        this.username = username;
        this.locations = locations;
  }
}
