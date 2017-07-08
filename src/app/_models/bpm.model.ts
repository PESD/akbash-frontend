import { Person } from './api.model'

export class User {
    api_url?: string;
    id?: number;
    username?: string;
}

export interface Task {
    api_url: string;
    id: number;
    name: string;
    task_function: string;
    task_type: string;
}

export class WorkflowTask {
  api_url: string;
  id: number;
  status: string;
  task: Task;
}

export interface Activity {
    api_url: string;
    id: number;
    name: string;
    users?: User[];
}

export interface Process {
    api_url: string;
    id: number;
    name: string;
    start_activity: Activity;
}

export interface WorkflowActivity {
    api_url: string;
    id: number;
    status: string;
    workflow: number;
    activity: Activity;
    workflow_tasks: WorkflowTask[];
}

export class Workflow {
    api_url: string;
    id: number;
    process: Process;
    person: Person;
    workflow_activites?: WorkflowActivity[];
}

export class WorkflowCreate {
  process_id?: any;
  person_id?: any;

  constructor(processID: string, personID: string) {
        this.process_id = processID;
        this.person_id = personID;
  }
}
