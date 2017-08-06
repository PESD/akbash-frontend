import { Component, OnInit, Input } from '@angular/core';

import { EmployeesService } from '../_services/employees.service';
import { PersonSkinny } from '../_models/api.model';

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

  constructor(private employeesService: EmployeesService) { }

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

  onRowSelect(event) { }
  onRowUnselect(event) { }

  ngOnInit() {
    this.getPersons();
  }

}
