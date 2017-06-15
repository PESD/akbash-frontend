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
import { Process } from '../workflowcomplete';


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
  ) { }

  employees: Employee[];
  buttonDisabled: boolean;
  selectedEmployee: Employee;
  employeeName: string;
  processes: Process[];
  selectProcesses: SelectItem[];
  selectedProcess: string;
  personID: string;
  processID: string;
  newWorkflowCreate: WorkflowCreate;
  msgs: Message[] = [];


  getEmployees(): void {
    this.employeesService.getEmployees().then(employees => this.employees = employees);
  }

  getProcesses(): void {
    this.workflowsService.getProcesses().then(processes => {
      this.processes = processes;
      this.buildProcessSelect();
    });
  }

  buildProcessSelect() {
    for (let process of this.processes) {
      this.selectProcesses = [];
      this.selectProcesses.push({label: process.name, value: process.id})
    }
  }

  ngOnInit() {
    this.getProcesses();
    this.getEmployees();
    this.buttonDisabled = true;
    this.employeeName = "";

  }

  checkButton() {
    console.log(`Checking button: personid is ${this.personID} and processid is ${this.processID}`);
    if (this.personID && this.processID) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  onRowSelect(event) {
    this.employeeName = `${this.selectedEmployee.first_name} ${this.selectedEmployee.last_name}`;
    this.personID = `${this.selectedEmployee.id}`;
    this.checkButton();
  }

  onRowUnselect(event) {
    this.employeeName = "";
    this.personID = "";
    this.checkButton();
  }

  onChange(event) {
    console.log(`THIS BOX IS A CHANGIN. ${this.selectedProcess}`);
    if (this.selectedProcess) {
      this.processID = this.selectedProcess;
    } else {
      this.processID = "";
    }
    this.checkButton();
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
