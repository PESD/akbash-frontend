import { Component, OnInit } from "@angular/core";

import { MenuItem, ConfirmationService, Message } from "primeng/primeng";

import { Workflow, Process, WorkflowCreate } from "../_models/bpm.model";
import { Person } from "../_models/api.model";
import { WorkflowsService } from "../_services/workflows.service";

export interface WorkflowGrid {
  id?: number;
  process_name?: string;
  first_name?: string;
  last_name?: string;
  current_activity?: string;
  current_user?: string;
  start_date?: string;
  person?: Person;
  status?: string;
}

@Component({
  selector: "app-workflows",
  templateUrl: "./workflows.component.html",
  styleUrls: ["./workflows.component.css"]
})
export class WorkflowsComponent implements OnInit {
  constructor(
    private workflowsService: WorkflowsService,
    private confirmationService: ConfirmationService
  ) {
    this.filterItems = [];
    this.filterItems.push({ label: "My Workflows" });
    this.filterItems.push({ label: "Active Workflows" });
    this.filterItems.push({ label: "All Workflows" });
    this.filterItems.push({ label: "Completed Workflows" });
    this.filterItems.push({ label: "Canceled Workflows" });
  }

  workflows: Workflow[];
  selectedWorkflows: WorkflowGrid;
  workflowGrid: WorkflowGrid[];
  filterItems: MenuItem[];
  selectedFilter: MenuItem;
  activeIndex = 0;
  selectedPerson: string = "1";
  cancelProcess: Process;
  msgs: Message[] = [];

  getWorkflows(): void {
    this.workflowsService.getAllWorkflows(this.activeIndex).then(workflows => {
      this.workflows = workflows;
      this.buildData();
    });
  }

  getProcesses(): void {
    this.workflowsService
      .getProcessesByCategory("cancel_workflow")
      .then(processes => {
        this.getCancelProcess(processes);
      });
  }

  getCancelProcess(processes: Process[]): void {
    console.log("Finding Cancel Process");
    for (let process of processes) {
      console.log("Evaluating...");
      if (process.name == "Cancel Workflow Process") {
        console.log("I found one!");
        this.cancelProcess = process;
      }
    }
  }

  buildData(): void {
    console.log("Rebuilding the data");
    this.getProcesses();
    this.workflowGrid = [];
    for (let row of this.workflows) {
      var grid: WorkflowGrid = {
        id: row.id,
        process_name: row.process.name,
        first_name: row.person.first_name,
        last_name: row.person.last_name,
        start_date: row.person.start_date,
        person: row.person,
        status: row.status
      };
      let workflowActivities: string[] = [];
      let workflowUsers: string[] = [];
      for (let actRow of row.workflow_activites) {
        if (actRow.status == "Active") {
          workflowActivities.push(actRow.activity.name);
          for (let user of actRow.activity.users) {
            workflowUsers.push(user.username);
          }
        }
      }
      grid.current_activity = workflowActivities.join(" - ");
      grid.current_user = workflowUsers.join(" - ");
      /*  console.log(row.workflow_activites) */
      this.workflowGrid.push(grid);
    }
  }

  shouldShowCancel(status: string, process_name: string): boolean {
    if (status == "Active" && process_name != "Cancel Workflow Process") {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.getWorkflows();
    this.activeIndex = 0;
  }

  onRowSelect(event) {}
  onRowUnselect(event) {}

  menuChange() {
    this.getWorkflows();
  }

  refreshData(event: object) {
    this.getWorkflows();
  }

  taskUpdateSuccessMessage(success: boolean, message: string) {
    if (success) {
      this.msgs.push({
        severity: "success",
        summary: "Workflow Created",
        detail: message
      });
    } else {
      this.msgs.push({
        severity: "error",
        summary: "Workflow Not Created",
        detail: message
      });
    }
  }

  confirmCancel(
    workflowID: string,
    firstName: string,
    lastName: string,
    personID: string
  ): void {
    this.confirmationService.confirm({
      message: `Cancel Workflow for ${firstName} ${lastName}`,
      accept: () => {
        this.commitCancel(workflowID, personID);
      }
    });
  }

  commitCancel(workflowID: string, personID: string): void {
    let workflowCreate = new WorkflowCreate(
      `${this.cancelProcess.id}`,
      personID
    );
    this.workflowsService
      .createWorkflow(workflowCreate)
      .then(newWorkflowCreate => {
        if (newWorkflowCreate.status) {
          this.taskUpdateSuccessMessage(true, newWorkflowCreate.message);
        } else {
          this.taskUpdateSuccessMessage(false, newWorkflowCreate.message);
        }
        this.getWorkflows();
      });
  }
}
