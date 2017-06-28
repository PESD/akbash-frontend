import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators }            from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

import { Contractor, Vendor, Position, Location } from '../_models/api.model';
import { EmployeesService } from '../_services/employees.service';
import { WorkflowsService }      from '../_services/workflows.service';
import { FormHelper } from '../_helpers/formhelper';
import { Process } from '../_models/bpm.model';

export class PositionForm {
  title = ['', Validators.required];
  location = ['', Validators.required];
}

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
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

  constructor (
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private workflowsService: WorkflowsService,
    ) {
    let formHelper = new FormHelper;
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
    })
  }

  buildVendorSelect() {
    this.selectVendors = [];
    for (let vendor of this.vendors) {
      this.selectVendors.push({label: vendor.name, value: vendor.id});
    }
  }

  buildLocationSelect() {
    this.selectLocations = []
    for (let location of this.locations) {
      this.selectLocations.push({label: location.short_name, value: location.id});
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
      vendor: ['', Validators.required],
      first_name: ['', Validators.required],
      middle_name: '',
      last_name: ['', Validators.required],
      birth_date: '',
      gender: [''],
      race_white: [false],
      race_asian: [false],
      race_black: [false],
      race_islander: [false],
      race_american_indian: [false],
      ethnicity: '',
      hqt: '',
      ssn: '',
      tcp_id: '',
      positions: this.fb.array([this.fb.group(new PositionForm())]),
    });
  }

  get positions(): FormArray {
    return this.contractorForm.get("positions") as FormArray;
  }

  addPosition() {
    this.positions.push(this.fb.group(new PositionForm()))
  }

  removePosition(index) {
    this.positions.removeAt(index);
  }

  saveContractor() {

  }

  revert() {
    this.createForm();
  }

}
