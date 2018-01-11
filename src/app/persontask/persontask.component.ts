import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Message, ConfirmationService } from "primeng/primeng";

import { WorkflowactivityService } from "../_services/workflowactivity.service";
import { PersonsService } from "../_services/persons.service";
import { WorkflowActivity, WorkflowTask } from "../_models/bpm.model";
import { AuthHelper } from "../_helpers/authhelper";
import {
  TaskEparSubmission,
  TaskVisionsIDSubmission,
  TaskEmployeeADSubmission,
  TaskSubADSubmission,
  TaskEmployeeSynergySubmission,
  TaskSubSynergySubmission,
  TaskVisionsPositionSubmission,
  TaskGenericCheckSubmission,
  TaskGenericTodoSubmission,
  TaskAssignLocationsSubmission
} from "../_models/task_submissions";
import { Epar, VisionsEmployee } from "../_models/visions.model";
import { Location, PersonSkinny } from "../_models/api.model";

@Component({
  selector: "app-persontask",
  templateUrl: "./persontask.component.html",
  styleUrls: ["./persontask.component.css"]
})
export class PersontaskComponent implements OnInit {
  @Input() workflow_id: string;
  @Output() update = new EventEmitter<any>();
  workflowActivities: WorkflowActivity[];
  person: PersonSkinny;
  workflowTasks: WorkflowTask[];
  msgs: Message[] = [];
  taskName: string;
  displayError: boolean = false;
  displayErrorMessage: string;
  // epar form vars
  eparForm: FormGroup;
  epar: Epar;
  // visions employee id form vars
  visionsIDForm: FormGroup;
  visionsSubIDForm: FormGroup;
  visionsEmployee: VisionsEmployee;
  adSubForm: FormGroup;
  synergySubForm: FormGroup;
  adSubUsername: string;
  synergySubUsername: string;
  list1: string[] = ["Hello", "World"];
  list2: string[] = ["Universe", "Galaxy"];
  availableLocations: Location[];
  employeeLocations: Location[];

  constructor(
    private workflowactivityService: WorkflowactivityService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private employeeService: PersonsService
  ) {
    this.createEparForm();
    this.createVisionsForm();
    this.createSubVisionsForm();
    this.createAdSubForm();
    this.createSynergySubForm();
  }

  ngOnInit() {
    this.getWorkflowActivity();
  }

  getWorkflowActivity() {
    this.workflowactivityService
      .getWorkflowActivity(this.workflow_id)
      .then(workflowActivities => {
        console.log(JSON.stringify(workflowActivities));
        this.workflowActivities = workflowActivities;
        this.refreshTasks();
      });
  }

  refreshTasks() {
    let authHeaders = new AuthHelper();
    this.workflowTasks = [];
    for (let workflowActivity of this.workflowActivities) {
      for (let workflowTask of workflowActivity.workflow_tasks) {
        let users = workflowActivity.activity.users;
        let usernames: string[] = [];
        for (let user of users) {
          usernames.push(user.username);
        }
        if (usernames.includes(authHeaders.getUsername())) {
          this.workflowTasks.push(workflowTask);
          if (workflowTask.task.name == "Assign Work Locations") {
            this.buildLocations();
          }
        }
      }
    }
  }

  buildLocations() {
    this.availableLocations = [];
    this.employeeLocations = [];
    this.employeeService
      .getPersonFromWorkflow(this.workflow_id)
      .then(persons => {
        this.employeeService
          .getLocationsFromPerson(String(persons[0].id))
          .then(locations => {
            this.employeeLocations = locations;
          });
        this.employeeService
          .getLocationsNotFromPerson(String(persons[0].id))
          .then(locations => {
            this.availableLocations = locations;
          });
      });
  }

  taskUpdateSuccessMessage(success: boolean, message: string) {
    if (success) {
      this.msgs.push({
        severity: "success",
        summary: `${this.taskName} Completed`,
        detail: message
      });
      this.update.emit({ refresh: true });
    } else {
      this.msgs.push({
        severity: "error",
        summary: `${this.taskName} Failed`,
        detail: message
      });
    }
  }

  displayErrorWithMessage(msg: string) {
    this.displayErrorMessage = msg;
    this.displayError = true;
  }

  // Forms -- Create and Submit functions

  // "Create ePAR" Form
  createEparForm() {
    this.eparForm = this.fb.group({
      epar_id: [null, Validators.pattern("[0-9]+")]
    });
  }

  submitEparForm(workflowTask: WorkflowTask) {
    const formModel = this.eparForm.value;
    let epar_id = formModel.epar_id;
    this.workflowactivityService.getEpar(epar_id).then(epar => {
      this.epar = epar;
      this.confirmEparForm(workflowTask);
    });
  }

  confirmEparForm(workflowTask: WorkflowTask) {
    if (this.epar.name) {
      let epar_string = `${this.epar.id} - ${this.epar.name}`;
      this.confirmationService.confirm({
        message: `Link to ePAR: ${epar_string}?`,
        accept: () => {
          this.commitEparForm(workflowTask);
        }
      });
    } else {
      this.displayErrorWithMessage("ePAR not Found");
    }
  }

  commitEparForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    const formModel = this.eparForm.value;
    let workflow_task_id = workflowTask.id;
    let epar_id = formModel.epar_id;
    let eparSubmission = new TaskEparSubmission(
      workflow_task_id,
      epar_id,
      username
    );
    this.workflowactivityService
      .taskSetEpar(eparSubmission)
      .then(taskEparSubmission => {
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
      visions_id: [null, Validators.pattern("[0-9]+")]
    });
  }

  submitVisionsIDForm(workflowTask: WorkflowTask) {
    const formModel = this.visionsIDForm.value;
    let visions_id = formModel.visions_id;
    this.workflowactivityService
      .getVisionsEmployee(visions_id)
      .then(visionsEmployee => {
        this.visionsEmployee = visionsEmployee;
        this.confirmVisionsIDForm(workflowTask);
      });
  }

  confirmVisionsIDForm(workflowTask: WorkflowTask) {
    if (this.visionsEmployee.name) {
      let visions_string = `${this.visionsEmployee.id} - ${
        this.visionsEmployee.name
      }`;
      this.confirmationService.confirm({
        message: `Link to Visions Employee: ${visions_string}?`,
        accept: () => {
          this.commitVisionsIDForm(workflowTask);
        }
      });
    } else {
      this.displayErrorWithMessage("Visions Employee not Found");
    }
  }

  commitVisionsIDForm(workflowTask: WorkflowTask) {
    const formModel = this.visionsIDForm.value;
    let workflow_task_id = workflowTask.id;
    let visions_id = formModel.visions_id;
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let visionsIDSubmission = new TaskVisionsIDSubmission(
      workflow_task_id,
      visions_id,
      username
    );
    this.workflowactivityService
      .taskSetVisionsID(visionsIDSubmission)
      .then(taskVisionsIDSubmission => {
        this.taskName = "Create Employee Maintenance Record";
        if (taskVisionsIDSubmission.status) {
          this.taskUpdateSuccessMessage(true, taskVisionsIDSubmission.message);
        } else {
          this.taskUpdateSuccessMessage(false, taskVisionsIDSubmission.message);
        }
      });
  }

  // Mark as Long-term Sub (piggy backs off of Create Employee Maintenance)
  createSubVisionsForm() {
    this.visionsSubIDForm = this.fb.group({
      visions_id: [null, Validators.pattern("[0-9]+")]
    });
  }

  submitSubVisionsIDForm(workflowTask: WorkflowTask) {
    const formModel = this.visionsSubIDForm.value;
    let visions_id = formModel.visions_id;
    this.workflowactivityService
      .getVisionsEmployee(visions_id)
      .then(visionsEmployee => {
        this.visionsEmployee = visionsEmployee;
        this.confirmSubVisionsIDForm(workflowTask);
      });
  }

  confirmSubVisionsIDForm(workflowTask: WorkflowTask) {
    if (this.visionsEmployee.name) {
      let visions_string = `${this.visionsEmployee.id} - ${
        this.visionsEmployee.name
      }`;
      this.confirmationService.confirm({
        message: `Link to Visions Employee: ${visions_string}?`,
        accept: () => {
          this.commitSubVisionsIDForm(workflowTask);
        }
      });
    } else {
      this.displayErrorWithMessage("Visions Employee not Found");
    }
  }

  commitSubVisionsIDForm(workflowTask: WorkflowTask) {
    const formModel = this.visionsSubIDForm.value;
    let workflow_task_id = workflowTask.id;
    let visions_id = formModel.visions_id;
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let visionsIDSubmission = new TaskVisionsIDSubmission(
      workflow_task_id,
      visions_id,
      username
    );
    this.workflowactivityService
      .taskSetVisionsID(visionsIDSubmission)
      .then(taskVisionsIDSubmission => {
        this.taskName = "Mark as Long-term Sub";
        if (taskVisionsIDSubmission.status) {
          this.taskUpdateSuccessMessage(true, taskVisionsIDSubmission.message);
        } else {
          this.taskUpdateSuccessMessage(false, taskVisionsIDSubmission.message);
        }
      });
  }

  // "Create Active Directory Account" Form
  submitEmployeeADForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskEmployeeADSubmission = new TaskEmployeeADSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskCheckEmployeeAD(taskEmployeeADSubmission)
      .then(taskEmployeeADSubmission => {
        this.taskName = "Verify Employee Active Directory";
        if (taskEmployeeADSubmission.status) {
          this.taskUpdateSuccessMessage(true, taskEmployeeADSubmission.message);
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskEmployeeADSubmission.message
          );
        }
      });
  }

  // "Disable Active Directory Account" Form
  submitDisableEmployeeADForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskEmployeeADSubmission = new TaskEmployeeADSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskCheckEmployeeAD(taskEmployeeADSubmission)
      .then(taskEmployeeADSubmission => {
        this.taskName = "Verify Employee Active Directory Disabled";
        if (taskEmployeeADSubmission.status) {
          this.taskUpdateSuccessMessage(true, taskEmployeeADSubmission.message);
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskEmployeeADSubmission.message
          );
        }
      });
  }

  // "Create Synergy Account" Form
  submitEmployeeSynergyForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskEmployeeSynergySubmission = new TaskEmployeeSynergySubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskCheckEmployeeSynergy(taskEmployeeSynergySubmission)
      .then(taskEmployeeSynergySubmission => {
        this.taskName = "Verify Employee Synergy Account";
        if (taskEmployeeSynergySubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskEmployeeSynergySubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskEmployeeSynergySubmission.message
          );
        }
      });
  }
  // "Disable Synergy Account" Form
  submitDisableEmployeeSynergyForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskEmployeeSynergySubmission = new TaskEmployeeSynergySubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskCheckEmployeeSynergy(taskEmployeeSynergySubmission)
      .then(taskEmployeeSynergySubmission => {
        this.taskName = "Verify Employee Synergy Account Disabled";
        if (taskEmployeeSynergySubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskEmployeeSynergySubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskEmployeeSynergySubmission.message
          );
        }
      });
  }

  skipEmployeeSynergyForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskEmployeeSynergySubmission = new TaskEmployeeSynergySubmission(
      workflowTask.id,
      username
    );
    taskEmployeeSynergySubmission.status = false;
    this.workflowactivityService
      .taskCheckEmployeeSynergy(taskEmployeeSynergySubmission)
      .then(taskEmployeeSynergySubmission => {
        this.taskName = "Set Employee Synergy Account as Not Needed";
        if (taskEmployeeSynergySubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskEmployeeSynergySubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskEmployeeSynergySubmission.message
          );
        }
      });
  }

  // "Assign Employee to Visions Position" Form
  submitEmployeeVisionsPositionForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskVisionsPositionSubmission = new TaskVisionsPositionSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskUpdateVisionsPositions(taskVisionsPositionSubmission)
      .then(taskVisionsPositionSubmission => {
        this.taskName = "Employee Added to Visions Position";
        if (taskVisionsPositionSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskVisionsPositionSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskVisionsPositionSubmission.message
          );
        }
      });
  }

  // "Create TCP Account" Form
  submitTcpAccountForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericCheckSubmission = new TaskGenericCheckSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericCheck(taskGenericCheckSubmission)
      .then(taskGenericCheckSubmission => {
        this.taskName = "Employee Added to Visions Position";
        if (taskGenericCheckSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericCheckSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericCheckSubmission.message
          );
        }
      });
  }

  // "Onboard Employee" Form
  submitIsOnboardedForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Onboard Employee";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "TCP Fingerprint Employee" Form
  submitIsTcpFingerprintedForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "TCP Fingerprint Employee";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Employee Badge Printed" Form
  submitIsEmployeeBadgePrintedForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Print Employee Badge";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Ignore Employee" Form
  submitIgnoreEmployeeForm(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericCheckSubmission = new TaskGenericCheckSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericCheck(taskGenericCheckSubmission)
      .then(taskGenericCheckSubmission => {
        this.taskName = "Ignore Employee";
        if (taskGenericCheckSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericCheckSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericCheckSubmission.message
          );
        }
      });
  }

  submitAssignLocations(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let location_ids: number[] = [];
    for (let location of this.employeeLocations) {
      location_ids.push(location.id);
    }
    let taskAssignLocationsSubmission = new TaskAssignLocationsSubmission(
      workflowTask.id,
      username,
      location_ids
    );
    this.workflowactivityService
      .taskAssignLocations(taskAssignLocationsSubmission)
      .then(taskAssignLocationsSubmission => {
        this.taskName = "Assign Work Locations";
        if (taskAssignLocationsSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskAssignLocationsSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskAssignLocationsSubmission.message
          );
        }
      });
  }

  // "Cancel Workflow" Form
  submitCancelWorkflow(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Cancel Workflow";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Verify Possible Active Directory Account Reversion" Form
  submitCancelADWorkflow(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Verify Possible Active Directory Account Reversion";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Verify Possible Synergy Account Reversion" Form
  submitCancelSynergyWorkflow(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Verify Possible Synergy Account Reversion";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Verify Possible Visions Position Reversion" Form
  submitCancelVisionsWorkflow(workflowTask: WorkflowTask) {
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let taskGenericTodoSubmission = new TaskGenericTodoSubmission(
      workflowTask.id,
      username
    );
    this.workflowactivityService
      .taskGenericTodo(taskGenericTodoSubmission)
      .then(taskGenericTodoSubmission => {
        this.taskName = "Verify Possible Visions Position Reversion";
        if (taskGenericTodoSubmission.status) {
          this.taskUpdateSuccessMessage(
            true,
            taskGenericTodoSubmission.message
          );
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskGenericTodoSubmission.message
          );
        }
      });
  }

  // "Create Long-term Sub Active Directory Account" Form
  createAdSubForm() {
    this.adSubForm = this.fb.group({
      ad_username: null
    });
  }

  commitAdSubForm(workflowTask: WorkflowTask) {
    const formModel = this.adSubForm.value;
    let workflow_task_id = workflowTask.id;
    let ad_username = formModel.ad_username;
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let adUsernameSubmission = new TaskSubADSubmission(
      workflow_task_id,
      username,
      ad_username
    );
    this.workflowactivityService
      .taskSetSubAD(adUsernameSubmission)
      .then(taskSubADSubmission => {
        this.taskName = "Create Long-term Sub Active Directory Account";
        if (taskSubADSubmission.status) {
          this.taskUpdateSuccessMessage(true, taskSubADSubmission.message);
        } else {
          this.taskUpdateSuccessMessage(false, taskSubADSubmission.message);
        }
      });
  }

  // "Create Long-term Sub Synergy Account" Form
  createSynergySubForm() {
    this.synergySubForm = this.fb.group({
      synergy_username: null
    });
  }

  commitSynergySubForm(workflowTask: WorkflowTask) {
    const formModel = this.synergySubForm.value;
    let workflow_task_id = workflowTask.id;
    let synergy_username = formModel.synergy_username;
    let authHeaders = new AuthHelper();
    let username = authHeaders.getUsername();
    let synergyUsernameSubmission = new TaskSubSynergySubmission(
      workflow_task_id,
      username,
      synergy_username
    );
    synergyUsernameSubmission.status = true;
    this.workflowactivityService
      .taskSetSubSynergy(synergyUsernameSubmission)
      .then(taskSubSynergySubmission => {
        this.taskName = "Create Long-term Sub Active Directory Account";
        if (taskSubSynergySubmission.status) {
          this.taskUpdateSuccessMessage(true, taskSubSynergySubmission.message);
        } else {
          this.taskUpdateSuccessMessage(
            false,
            taskSubSynergySubmission.message
          );
        }
      });
  }
}
