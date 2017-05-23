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
} from 'primeng/primeng';

import { EmployeesService } from '../employees.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeesService, ConfirmationService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeesService: EmployeesService, private confirmationService: ConfirmationService) {
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

  getEmployees(): void {
    this.employeesService.getEmployees().then(employees => this.employees = employees);
    console.log(this.employees);
  }

  ngOnInit() {
    this.getEmployees();
    this.buttonDisabled = true;
    this.employeeName = "";

  }

  onRowSelect(event) {
    this.buttonDisabled = false;
    this.employeeName = `${this.selectedEmployee.first_name} ${this.selectedEmployee.last_name}`;
  }

  onRowUnselect(event) {
    this.buttonDisabled = true;
  }

  confirm() {
    this.confirmationService.confirm({
      message: `Start a New Hire Process for ${this.employeeName}?`,
        accept: () => {
                //Actual logic to perform a confirmation
        }
      });
    }

}
