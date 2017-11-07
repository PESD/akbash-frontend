import { Component, OnInit } from '@angular/core';
import { WorkflowsService }      from '../_services/workflows.service';
import { EmployeesService } from '../_services/employees.service';
import { DashboardStats, Graph } from '../_models/bpm.model';
import { PersonSkinny } from '../_models/api.model';

export interface PersonGrid {
  id?: number;
  status?: string;
  first_name?: string;
  last_name?: string;
  start_date?: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardStats: DashboardStats;
  personGrid: PersonGrid[];
  persons: PersonSkinny[];
  graphProcess: Graph;
  options: any;

  constructor(private workflowsService: WorkflowsService, private employeesService: EmployeesService) {
    this.dashboardStats = new DashboardStats();
    this.dashboardStats.my_tasks = 0;
    this.dashboardStats.hires_this_month = 0;
    this.dashboardStats.active_workflows = 0;
    this.options = {
            title: {
                display: false,
                text: 'My Title',
                fontSize: 16
            },
            legend: {
                position: 'bottom'
            }
        };
  }

  ngOnInit() {
    this.getDashboardStats();
    this.getPersons();
    this.getGraphProcess();
  }

  getDashboardStats(): void {
    this.workflowsService.getDashboardStats().then(dashboardStats => {
      this.dashboardStats = dashboardStats;
    });
  }

  getPersons(): void {
    this.employeesService.getPersonMissedStartDate().then(persons => {
      this.persons = persons;
      this.buildPersonGrid();
    })
  }

  getGraphProcess(): void {
    this.workflowsService.getGraphProcess().then(graph => {
      this.graphProcess = graph;
      console.log(graph)
    });
  }

  buildPersonGrid(): void {
    this.personGrid = [];
    for (let person of this.persons) {
      let grid: PersonGrid = {
        id: person.id,
        status: person.status,
        first_name: person.first_name,
        last_name: person.last_name,
        start_date: person.start_date,
      }
      this.personGrid.push(grid);
    }
  }

}
