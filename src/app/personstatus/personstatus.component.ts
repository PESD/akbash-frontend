import { Component, OnInit, Input } from '@angular/core';

import { Employee, Position, Contractor, Person, Vendor } from '../_models/api.model';
import { EmployeesService } from '../_services/employees.service';

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

  person: Person;
  employee: Employee;
  contractor: Contractor;
  vendor: Vendor;
  positions: Position[];
  showEmployee: boolean = false;
  showContractor: boolean = false;
  visionsUsername: string;
  activeDirectoryUsername: string;
  synergyUsername: string;

  constructor(private employeesService: EmployeesService) { }

  getPerson() {
    this.employeesService.getPerson(this.person_id).then(person => {
      this.person = person;
      if(this.person.services) {
        for (let service of this.person.services) {
          switch(service["type"]) {
            case "ad": {
              this.activeDirectoryUsername = service["user_info"];
              break;
            }
            case "visions": {
              this.visionsUsername = service["user_info"];
              break;
            }
            case "synergy": {
              this.synergyUsername = service["user_info"];
              break;
            }
            default: {
              break;
            }
          }
        }
      }
      console.log(person.services)
      if (person.type == "Employee") {
        this.showEmployee = true;
        this.showContractor = false;
        this.employeesService.getEmployee(this.person_id).then(employee => this.employee = employee)
      } else {
        this.showEmployee = false;
        this.showContractor = true;
        this.employeesService.getContractor(this.person_id).then(contractor => {
          this.contractor = contractor;
          this.employeesService.getVendor(contractor.vendor).then(vendor => this.vendor = vendor)
        })
      }
      console.log(this.person.id)
    });
  }

  getPositions() {
    this.employeesService.getPositions(this.person_id).then(positions => {
      this.positions = positions;
    })
  }

  ngOnInit() {
    this.person = new Person();
    this.employee = new Employee();
    this.contractor = new Contractor();
    this.vendor = new Vendor();
    this.positions = [];
    this.getPerson();
    this.getPositions();
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
