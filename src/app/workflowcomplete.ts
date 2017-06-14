export interface User {
    api_url: string;
    id: number;
    username: string;
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

export interface Person {
    api_url: string;
    id: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    badge_number?: any;
    birth_date?: string;
    gender?: string;
    race_white?: boolean;
    race_asian?: boolean;
    race_black?: boolean;
    race_islander?: boolean;
    race_american_indian?: boolean;
    ethnicity?: string;
    hqt?: string;
    ssn?: string;
    tcp_id?: any;
    talented_id?: number;
    is_onboarded?: boolean;
    onboarded_date?: any;
    onboarded_by?: any;
    is_tcp_fingerprinted?: boolean;
    tcp_fingerprinted_date?: any;
    tcp_fingerprinted_by?: any;
    is_badge_created?: boolean;
    badge_created_date?: any;
    badge_created_by?: any;
    is_emp_record_created?: boolean;
    emp_record_created_date?: any;
    emp_record_created_by?: any;
    is_position_linked?: boolean;
    position_linked_date?: any;
    position_linked_by?: any;
    is_visions_account_created?: boolean;
    visions_account_created_date?: any;
    visions_account_created_by?: any;
    is_synergy_account_created?: boolean;
    synergy_account_created_date?: any;
    synergy_account_created_by?: any;
    is_ad_account_created?: boolean;
    ad_account_created_date?: any;
    ad_account_created_by?: any;
    services?: any[];
}

export interface WorkflowActivity {
    api_url: string;
    id: number;
    status: string;
    workflow: number;
    activity: Activity;
    workflow_tasks: WorkflowTask[];
}

export class WorkflowComplete {
    api_url: string;
    id: number;
    process: Process;
    person: Person;
    workflow_activites?: WorkflowActivity[];
}
