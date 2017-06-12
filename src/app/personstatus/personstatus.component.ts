import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../employee';
import { EmployeesService } from '../employees.service';

enum PanelStatus {
  Complete,
  Incomplete,
  Unneeded
}

@Component({
  selector: 'app-personstatus',
  templateUrl: './personstatus.component.html',
  styleUrls: ['./personstatus.component.css']
})
export class PersonstatusComponent implements OnInit {
  @Input() person_id: string;

  employee: Employee;

  constructor(private employeesService: EmployeesService) { }

  getEmployee() {
    this.employeesService.getEmployee(this.person_id).then(employee => {
      this.employee = employee;
      console.log(this.employee.id)
    });
  }

  ngOnInit() {
    this.employee = new Employee;
    this.getEmployee();
  }

  getStatusText(value: string | boolean, notNeeded?: boolean): string {
    if (notNeeded) {
      return "N/A"
    }
    if (!value) {
      return "None"
    }
    if (typeof value === "boolean") {
      return value.toString();
    }
    return value;
  }

  setPanelClass(value: string | boolean, notNeeded?: boolean) {
    var classes = {}
    if (notNeeded) {
      classes = {
        panelNotNeeded: true
      }
    }
    else if (value) {
      classes = {
        panelCompleted: true
      }
    }
    else {
      classes = {
        panelNotCompleted: true
      }
    }
    return classes


  }

}
