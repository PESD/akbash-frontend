import { Component, OnInit } from '@angular/core';

import { WorkflowComplete } from '../workflowcomplete';
import { WorkflowsService }      from '../workflows.service';

export interface WorkflowGrid {
  id?: number;
  process_name?: string;
  first_name?: string;
  last_name?: string;
  current_activity?: string;
  current_user?: string;
}

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  constructor(private workflowsService: WorkflowsService) { }

  workflowCompletes: WorkflowComplete[];
  selectedWorkflowComplete: WorkflowComplete;
  workflowGrid: WorkflowGrid[];


  getWorkflows(): void {
    this.workflowsService.getAllWorkflows().then(workflowCompletes => {
      this.workflowCompletes = workflowCompletes;
      this.buildData();
    });
  }

  buildData(): void {
    this.workflowGrid = []
    for (let row of this.workflowCompletes) {
      var grid: WorkflowGrid = {
        id: row.id,
        process_name: row.process.name,
        first_name: row.person.first_name,
        last_name: row.person.last_name,
      };

      for (let actRow of row.workflow_activites) {
        if (actRow.status == "Active") {
          grid.current_activity = actRow.activity.name;
          var users = "";
          for (let user of actRow.activity.users) {
            users = users + user.username + " ";
          }
        }
      }
    /*  console.log(row.workflow_activites) */
      this.workflowGrid.push(grid)
    }
  }

  ngOnInit() {
    this.getWorkflows()
  }

  onRowSelect(event) { }
  onRowUnselect(event) { }

}
