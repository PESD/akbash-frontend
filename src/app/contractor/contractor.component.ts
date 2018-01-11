import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { SelectItem, Message } from "primeng/primeng";

import { Contractor, Vendor, Position, Location } from "../_models/api.model";
import { PersonsService } from "../_services/persons.service";
import { WorkflowsService } from "../_services/workflows.service";
import { FormHelper } from "../_helpers/formhelper";
import { AuthHelper } from "../_helpers/authhelper";
import { Process } from "../_models/bpm.model";

export class PositionForm {
  title = ["", Validators.required];
  location = ["", Validators.required];
}

@Component({
  selector: "app-contractor",
  templateUrl: "./contractor.component.html",
  styleUrls: ["./contractor.component.css"]
})
export class ContractorComponent implements OnInit {
  contractor: Contractor;
  contractorForm: FormGroup;
  genders: SelectItem[];
  races: SelectItem[];
  ethnicities: SelectItem[];
  vendors: Vendor[];
  selectVendors: SelectItem[];
  locations: Location[];
  selectLocations: SelectItem[];
  visionsPositions: string[];
  positionSelect: SelectItem[];
  selectedVendor: string;
  vendorID: string;
  processes: Process[];
  process: Process;
  contractorVendor: Vendor;
  newContractor: Contractor;
  contractorPositions: Position[];
  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private employeesService: PersonsService,
    private workflowsService: WorkflowsService
  ) {
    let formHelper = new FormHelper();
    this.createForm();
    this.genders = formHelper.getGenders();
    this.races = formHelper.getRaces();
    this.ethnicities = formHelper.getEthnicities();
  }

  ngOnInit() {
    this.getVendors();
    this.getLocations();
  }

  getProcesses(): void {
    this.workflowsService.getProcesses().then(processes => {
      this.processes = processes;
      this.getProcess();
    });
  }

  getProcess() {
    for (let process of this.processes) {
      if (process.name.indexOf("Contractor") >= 0) {
        this.process = process;
      }
    }
  }

  getVendors() {
    this.employeesService.getVendors().then(vendors => {
      this.vendors = vendors;
      this.buildVendorSelect();
    });
  }

  getLocations() {
    this.employeesService.getLocations().then(locations => {
      this.locations = locations;
      this.buildLocationSelect();
    });
  }

  buildVendorSelect() {
    this.selectVendors = [];
    for (let vendor of this.vendors) {
      this.selectVendors.push({ label: vendor.name, value: vendor.id });
    }
  }

  buildLocationSelect() {
    this.selectLocations = [];
    for (let location of this.locations) {
      this.selectLocations.push({
        label: location.short_name,
        value: location.id
      });
    }
  }

  onChange(event) {
    if (this.selectedVendor) {
      this.vendorID = this.selectedVendor;
    } else {
      this.vendorID = "";
    }
  }

  createForm() {
    this.contractorForm = this.fb.group({
      vendor: ["", Validators.required],
      first_name: ["", Validators.required],
      middle_name: "",
      last_name: ["", Validators.required],
      birth_date: "",
      gender: [""],
      race_white: [false],
      race_asian: [false],
      race_black: [false],
      race_islander: [false],
      race_american_indian: [false],
      ethnicity: "",
      hqt: "",
      ssn: "",
      tcp_id: "",
      start_date: ["", Validators.required],
      is_synergy_account_needed: [false],
      positions: this.fb.array([this.fb.group(new PositionForm())])
    });
  }

  get positions(): FormArray {
    return this.contractorForm.get("positions") as FormArray;
  }

  addPosition() {
    this.positions.push(this.fb.group(new PositionForm()));
  }

  removePosition(index) {
    this.positions.removeAt(index);
  }

  prepareSave() {
    const formModel = this.contractorForm.value;
    this.newContractor = new Contractor();
    let birth_date = formModel.birth_date as Date;
    let bday_string = "1900-01-01";
    if (birth_date) {
      bday_string = birth_date.yyyymmdd();
    }
    let start_date_string = formModel.start_date as string;
    if (!(formModel.start_date.length === 10)) {
      let start_date = formModel.start_date as Date;
      start_date_string = start_date.yyyymmdd();
    }
    this.newContractor.first_name = formModel.first_name as string;
    this.newContractor.last_name = formModel.last_name as string;
    this.newContractor.middle_name = formModel.middle_name as string;
    this.newContractor.birth_date = bday_string;
    this.newContractor.gender = formModel.gender as string;
    this.newContractor.race_asian = formModel.race_asian as boolean;
    this.newContractor.race_black = formModel.race_black as boolean;
    this.newContractor.race_white = formModel.race_white as boolean;
    this.newContractor.race_islander = formModel.race_islander as boolean;
    this.newContractor.race_american_indian = formModel.race_american_indian as boolean;
    this.newContractor.ethnicity = formModel.ethnicity as string;
    this.newContractor.ssn = formModel.ssn as string;
    this.newContractor.start_date = start_date_string;
    this.newContractor.is_synergy_account_needed = formModel.is_synergy_account_needed as boolean;
    //this.prepareVendor(formModel.vendor as string);
    let posArr = this.contractorForm.get("positions") as FormArray;
    this.preparePositions(posArr);
    this.newContractor.vendor = formModel.vendor as number;
    this.newContractor.type = "Contractor";
  }

  saveContractor() {
    this.prepareSave();
    this.employeesService
      .saveContractorNew(this.newContractor, this.contractorPositions)
      .then(status => {
        if (status) {
          console.log("WE HAVE SAVED A CONTRACTOR OMG");
        } else {
          console.log("THERE WAS A PROBLEM WHEN SAVING CONTRACTOR");
        }
        this.resultMessage(status);
      });
    this.revert();
  }
  /*
  prepareVendor(vendorID: string) {
    const vendorIDNumber = +vendorID;
    this.contractorVendor = this.vendors.find(vendor => vendor.id === vendorIDNumber);
  }
  */

  preparePositions(formArray: FormArray) {
    let authHeaders = new AuthHelper();
    this.contractorPositions = [];
    for (var i = 0; i < formArray.length; i++) {
      let group = formArray.at(i) as FormGroup;
      let values = group.value;
      let location = this.locations.find(
        location => location.id === +values.location
      );
      console.log(location);
      let position = new Position();
      position.title = values.title;
      position.location = location;
      position.last_updated_by = authHeaders.getUsername();
      this.contractorPositions.push(position);
    }
  }

  revert() {
    this.createForm();
  }

  resultMessage(success: boolean) {
    if (success) {
      this.msgs.push({
        severity: "success",
        summary: "Contractor Added",
        detail: "Contractor has been added"
      });
    } else {
      this.msgs.push({
        severity: "error",
        summary: "Error Adding Contractor",
        detail: "Please check your data and try again."
      });
    }
  }
}
