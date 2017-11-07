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
    status?: any;
    workflow_activites?: WorkflowActivity[];
}

export class WorkflowCreate {
  process_id?: any;
  person_id?: any;
  status?: any;
  message?: any;

  constructor(processID: string, personID: string) {
        this.process_id = processID;
        this.person_id = personID;
        this.status = false;
        this.message = "";
  }
}

export class WorkflowWithActivityData {
  completed_by?: any;
  completed_date?: any;
}

export class WorkflowWithActivity {
  label?: any;
  type?: any;
  data?: WorkflowWithActivityData;
  children?: any;
}

export class DashboardStats {
  my_tasks?: any;
  hires_this_month?: any;
  active_workflows?: any;
}

export interface GraphDataSet {
    label: string;
    data: number[];
}

export interface Graph {
    labels: string[];
    datasets: GraphDataSet[];
}
