import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import { Message } from 'primeng/primeng';

import { WorkflowactivityService } from '../_services/workflowactivity.service';
import { WorkflowActivity, WorkflowTask }      from '../_models/bpm.model';
import { TaskEparSubmission, TaskVisionsIDSubmission } from '../_models/task_submissions';

@Component({
  selector: 'app-persontask',
  templateUrl: './persontask.component.html',
  styleUrls: ['./persontask.component.css']
})
export class PersontaskComponent implements OnInit {
  @Input() workflow_id: string;
  workflowActivities: WorkflowActivity[];
  workflowTasks: WorkflowTask[];
  msgs: Message[] = [];
  taskName: string;
  // One FormGroup per task
  eparForm: FormGroup;
  visionsIDForm: FormGroup;

  constructor(private workflowactivityService: WorkflowactivityService, private fb: FormBuilder) {
    this.createEparForm();
    this.createVisionsForm();
  }

  ngOnInit() {
    this.getWorkflowActivity();
  }

  getWorkflowActivity() {
    this.workflowactivityService.getWorkflowActivity(this.workflow_id).then(workflowActivities => {
      console.log(JSON.stringify(workflowActivities))
      this.workflowActivities = workflowActivities;
      this.refreshTasks();
    });
  }

  refreshTasks() {
    console.log("REFESHING SOME TASKS!");
    this.workflowTasks = [];
    for (let workflowActivity of this.workflowActivities) {
      console.log("FOUND AN ACTIVITY!");
      for (let workflowTask of workflowActivity.workflow_tasks) {
        console.log("FOUND A TASK!");
        this.workflowTasks.push(workflowTask);
      }
    }
  }

  taskUpdateSuccessMessage(success: boolean, message: string) {
    if (success) {
      this.msgs.push({severity:'success', summary:`${this.taskName} Completed`, detail:message});
    } else {
      this.msgs.push({severity:'error', summary:`${this.taskName} Failed`, detail:message});
    }
  }

// Forms -- Create and Submit functions

// "Create ePAR" Form
  createEparForm() {
    this.eparForm = this.fb.group({
      epar_id: [null, Validators.pattern('[0-9]+')]
    });
  }

  submitEparForm(workflowTask: WorkflowTask) {
    const formModel = this.eparForm.value;
    let workflow_task_id = workflowTask.id;
    let epar_id = formModel.epar_id;
    let eparSubmission = new TaskEparSubmission(workflow_task_id, epar_id);
    this.workflowactivityService.taskSetEpar(eparSubmission).then(taskEparSubmission => {
      this.taskName = "Create ePAR";
      if (taskEparSubmission.status) {
        this.taskUpdateSuccessMessage(true, taskEparSubmission.message);
      } else {
        this.taskUpdateSuccessMessage(false, taskEparSubmission.message);
      }

    });
  }

// "Create Employee Maintenance Record" Form
  createVisionsForm() {
    this.visionsIDForm = this.fb.group({
      visions_id: [null, Validators.pattern('[0-9]+')]
    });
  }

  submitVisionsIDForm(workflowTask: WorkflowTask) {
    const formModel = this.visionsIDForm.value;
    let workflow_task_id = workflowTask.id;
    let visions_id = formModel.visions_id;
    let visionsIDSubmission = new TaskVisionsIDSubmission(workflow_task_id, visions_id);
    this.workflowactivityService.taskSetVisionsID(visionsIDSubmission).then(taskVisionsIDSubmission => {
      this.taskName = "Create Employee Maintenance Record";
      if (taskVisionsIDSubmission.status) {
        this.taskUpdateSuccessMessage(true, taskVisionsIDSubmission.message);
      } else {
        this.taskUpdateSuccessMessage(false, taskVisionsIDSubmission.message);
      }
    })
  }

}
