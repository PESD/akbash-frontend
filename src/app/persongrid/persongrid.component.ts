import { Component, OnInit, Input } from '@angular/core';

import { EmployeesService } from '../_services/employees.service';
import { PersonSkinny } from '../_models/api.model';
import { WorkflowsService }      from '../_services/workflows.service';
import { WorkflowCreate, Process } from '../_models/bpm.model';

import { SelectItem, Message, ConfirmationService } from 'primeng/primeng';

export interface PersonGrid {
  id?: number;
  status?: string;
  first_name?: string;
  last_name?: string;
  hire_date?: any;
  positions?: string;
  locations?: string;
}

@Component({
  selector: 'app-persongrid',
  templateUrl: './persongrid.component.html',
  styleUrls: ['./persongrid.component.css']
})
export class PersongridComponent implements OnInit {
  @Input() person_type: string;
  persons: PersonSkinny[];
  selectedPerson: PersonGrid;
  personGrid: PersonGrid[];
  buttonDisabled: boolean;
  personName: string;
  selectProcesses: SelectItem[];
  selectedProcess: string;
  processID: string;
  personID: string;
  newWorkflowCreate: WorkflowCreate;
  msgs: Message[] = [];
  processes: Process[];

  constructor(
    private employeesService: EmployeesService,
    private confirmationService: ConfirmationService,
    private workflowsService: WorkflowsService
  ) { }

  getPersons(): void {
    this.employeesService.getPersonsbyType(this.person_type).then(persons => {
        this.persons = persons;
        this.buildData();
    });

  }

  buildData(): void {
    this.personGrid = [];
    for (let person of this.persons) {
      let positions: string[] = [];
      let locations: string[] = [];
      for (let position of person.positions) {
        positions.push(position.title);
        locations.push(position.location);
      }
      let position_string = positions.join(" - ");
      let location_string = locations.join(" - ");
      let grid: PersonGrid = {
        id: person.id,
        status: person.status,
        first_name: person.first_name,
        last_name: person.last_name,
        hire_date: person.start_date,
        positions: position_string,
        locations: location_string,
      }
      this.personGrid.push(grid);
    }
  }

  onRowSelect(event) {
    this.personName = `${this.selectedPerson.first_name} ${this.selectedPerson.last_name}`;
    this.personID = `${this.selectedPerson.id}`;
    this.checkButton();
  }
  onRowUnselect(event) {
    this.personName = "";
    this.personID = "";
    this.checkButton();
  }

  onChange(event) {
    if (this.selectedProcess) {
      this.processID = this.selectedProcess;
      let label = "";
      for (let process of this.selectProcesses) {
        if (process.value == this.selectedProcess) {
          label = process.label;
        }
      }
    } else {
      this.processID = "";
    }
    this.checkButton();
  }

  checkButton() {
    if (this.personID && this.processID) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }

  confirm() {
    console.log(this.selectedPerson.status);
    let processName = "Process";
    for (let process of this.processes) {
      if (`${process.id}` == this.processID) {
        processName = process.name;
      }
    }
    this.confirmationService.confirm({
      message: `Start a ${processName} for ${this.personName}?`,
        accept: () => {
          let workflowCreate = new WorkflowCreate(this.processID, this.personID);
          this.workflowsService.createWorkflow(workflowCreate).then(newWorkflowCreate => {
            this.newWorkflowCreate = newWorkflowCreate;
            this.showWorkflowCreateSuccess();
            this.getPersons();
            this.buttonDisabled = true;
            this.personName = "";
          });
                //Actual logic to perform a confirmation
        }
      });
    }

  showWorkflowCreateSuccess() {
    this.msgs.push({severity:'success', summary:'Workflow Created', detail:'Workflow successfully created.'});
  }

  getProcesses(): void {
    this.workflowsService.getProcessesByCategory("existing_employee").then(processes => {
      this.processes = processes;
      this.buildProcessSelect();
    });
  }

  buildProcessSelect() {
    this.selectProcesses = [];
    for (let process of this.processes) {
      if (!(process.name.indexOf("Contractor") >= 0) && !(process.name.indexOf("New Hire") >= 0) && !(process.name.indexOf("Ignore") >= 0)) {
        this.selectProcesses.push({label: process.name, value: process.id})
      }
    }
  }

  ngOnInit() {
    this.getPersons();
    this.getProcesses();
    this.buttonDisabled = true;
    this.personName = "";
  }

}
