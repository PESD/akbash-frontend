import { Component, OnInit } from '@angular/core';

import {TabMenuModule,MenuItem} from 'primeng/primeng';

import { EmployeesService } from '../employees.service';
import { Employee } from '../employee';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeesService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeesService: EmployeesService) { }

  employees: Employee[];

  getEmployees(): void {
    this.employeesService.getEmployees().then(employees => this.employees = employees);
    console.log(this.employees)
  }

  ngOnInit() {
    this.getEmployees();
  }

}
