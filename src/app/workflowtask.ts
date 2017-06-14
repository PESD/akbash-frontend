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
