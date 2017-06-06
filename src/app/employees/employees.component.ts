import { Component, OnInit } from '@angular/core';

import {
  TabMenuModule,
  MenuItem,
  DialogModule,
  ButtonModule,
  DropdownModule,
  SelectItem,
  ConfirmDialogModule,
  ConfirmationService,
  GrowlModule,
  Message,
} from 'primeng/primeng';

import { EmployeesService } from '../employees.service';
import { Employee } from '../employee';
import { WorkflowsService }      from '../workflows.service';
import { WorkflowCreate } from '../workflowcreate';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeesService, ConfirmationService]
})
export class EmployeesComponent implements OnInit {

  constructor(
    private employeesService: EmployeesService,
    private confirmationService: ConfirmationService,
    private workflowsService: WorkflowsService
  ) {
    this.processes = [];
    this.processes.push({label: "Select Process", value: null})
    this.processes.push({label: "New Hire Process", value: 1})
  }

  employees: Employee[];
  buttonDisabled: boolean;
  selectedEmployee: Employee;
  employeeName: string;
  processes: SelectItem[];
  selectedProcess: string;
  personID: string;
  processID: string;
  newWorkflowCreate: WorkflowCreate;
  msgs: Message[] = [];


  getEmployees(): void {
    this.employeesService.getEmployees().then(employees => this.employees = employees);
  }

  ngOnInit() {
    this.getEmployees();
    this.buttonDisabled = true;
    this.employeeName = "";

  }

  onRowSelect(event) {
    this.buttonDisabled = false;
    this.employeeName = `${this.selectedEmployee.first_name} ${this.selectedEmployee.last_name}`;
    this.personID = `${this.selectedEmployee.id}`;
    this.processID = "1";
  }

  onRowUnselect(event) {
    this.buttonDisabled = true;
  }

  showWorkflowCreateSuccess() {
    this.msgs.push({severity:'success', summary:'Workflow Created', detail:'Workflow successfully created.'});
  }

  confirm() {
    this.confirmationService.confirm({
      message: `Start a New Hire Process for ${this.employeeName}?`,
        accept: () => {
          let workflowCreate = new WorkflowCreate(this.processID, this.personID);
          this.workflowsService.createWorkflow(workflowCreate).then(newWorkflowCreate => {
            this.newWorkflowCreate = newWorkflowCreate;
            console.log("WORKFLOW CREATED WOOHOO!");
            this.showWorkflowCreateSuccess();
            this.getEmployees();
            this.buttonDisabled = true;
            this.employeeName = "";
          });
                //Actual logic to perform a confirmation
        }
      });
    }

}
