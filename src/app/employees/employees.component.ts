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

import { EmployeesService } from '../_services/employees.service';
import { Employee } from '../_models/api.model';
import { WorkflowsService }      from '../_services/workflows.service';
import { WorkflowCreate, Process } from '../_models/bpm.model';


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
    this.workflowsService.getProcessesByCategory("new_hire").then(processes => {
      this.processes = processes;
      this.buildProcessSelect();
    });
  }

  buildProcessSelect() {
    this.selectProcesses = [];
    for (let process of this.processes) {
      if (!(process.name.indexOf("Contractor") >= 0)) {
        this.selectProcesses.push({label: process.name, value: process.id})
      }
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
    let processName = "Process";
    for (let process of this.processes) {
      if (`${process.id}` == this.processID) {
        processName = process.name;
      }
    }
    this.confirmationService.confirm({
      message: `Start a ${processName} for ${this.employeeName}?`,
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
