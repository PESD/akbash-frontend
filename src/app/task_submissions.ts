export class TaskEparSubmission {
  workflow_task_id?: any;
  epar_id?: any;
  status?: any;

  constructor(workflow_task_id: number, epar_id: any) {
        this.workflow_task_id = workflow_task_id;
        this.epar_id = epar_id;
        this.status = false;
  }
}
