import { Component, OnInit, Input } from "@angular/core";
import { TreeNode } from "primeng/primeng";

import { WorkflowsService } from "../_services/workflows.service";

@Component({
  selector: "app-workflowchart",
  templateUrl: "./workflowchart.component.html",
  styleUrls: ["./workflowchart.component.css"]
})
export class WorkflowchartComponent implements OnInit {
  @Input() workflow_id: string;
  workflowTree: TreeNode[];

  constructor(private workflowsService: WorkflowsService) {}

  getWorkflowTree(): void {
    this.workflowsService
      .getWorkflowTreeNode(this.workflow_id)
      .then(workflowTree => {
        this.workflowTree = workflowTree;
        console.log(this.workflowTree);
      });
  }

  ngOnInit() {
    this.getWorkflowTree();
  }
}
