import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';

import { Workflow } from '../_models/bpm.model';
import { Person } from '../_models/api.model';
import { WorkflowsService }      from '../_services/workflows.service';

export interface WorkflowGrid {
  id?: number;
  process_name?: string;
  first_name?: string;
  last_name?: string;
  current_activity?: string;
  current_user?: string;
  person?: Person;
}

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  constructor(private workflowsService: WorkflowsService) {
    this.filterItems = [];
    this.filterItems.push({label: "My Workflows"});
    this.filterItems.push({label: "Active Workflows"});
    this.filterItems.push({label: "All Workflows"});

  }

  workflows: Workflow[];
  selectedWorkflows: Workflow;
  workflowGrid: WorkflowGrid[];
  filterItems: MenuItem[];
  selectedFilter: MenuItem;
  activeIndex = 0;
  selectedPerson: string = "1";


  getWorkflows(): void {
    this.workflowsService.getAllWorkflows(this.activeIndex).then(workflows => {
      this.workflows = workflows;
      this.buildData();
    });
  }

  buildData(): void {
    console.log("Rebuilding the data")
    this.workflowGrid = []
    for (let row of this.workflows) {
      var grid: WorkflowGrid = {
        id: row.id,
        process_name: row.process.name,
        first_name: row.person.first_name,
        last_name: row.person.last_name,
        person: row.person
      };

      for (let actRow of row.workflow_activites) {
        if (actRow.status == "Active") {
          grid.current_activity = actRow.activity.name;
          var users = "";
          for (let user of actRow.activity.users) {
            users = users + user.username + " ";
          }
          grid.current_user = users;
        }
      }
    /*  console.log(row.workflow_activites) */
      this.workflowGrid.push(grid)
    }
  }

  ngOnInit() {
    this.getWorkflows()
    this.activeIndex = 0;
  }

  onRowSelect(event) { }
  onRowUnselect(event) { }

  menuChange(index) {
    console.log(this.activeIndex);
    this.getWorkflows();
  }

  refreshData(event: object) {
    this.getWorkflows();
  }

}
