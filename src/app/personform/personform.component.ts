import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

import { Employee } from '../_models/api.model';
import { EmployeesService } from '../_services/employees.service';
import { FormHelper } from '../_helpers/formhelper';



@Component({
  selector: 'app-personform',
  templateUrl: './personform.component.html',
  styleUrls: ['./personform.component.css']
})
export class PersonformComponent implements OnInit {
  @Input() person_id: string;
  @Output() update = new EventEmitter<any>();
  employee: Employee;
  personForm: FormGroup;
  genders: SelectItem[];
  races: SelectItem[];
  ethnicities: SelectItem[];
  selectedGender: string;


  constructor(private fb: FormBuilder, private employeesService: EmployeesService) {
    let formHelper = new FormHelper;
    this.createForm();
    this.genders = formHelper.getGenders();
    this.races = formHelper.getRaces();
    this.ethnicities = formHelper.getEthnicities();
  }

  ngOnInit() {
    this.getEmployee();
  }

  getEmployee() {
    this.employeesService.getEmployee(this.person_id).then(employee => {
      this.employee = employee;
      this.personForm.reset();
      this.updateForm();
    });
  }

  createForm() {
    this.personForm = this.fb.group({
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
    });
  }

  updateForm() {
    this.personForm.setValue({
      first_name: this.employee.first_name,
      middle_name: this.employee.middle_name,
      last_name: this.employee.last_name,
      birth_date: this.employee.birth_date,
      gender: this.employee.gender,
      race_white: this.employee.race_white,
      race_asian: this.employee.race_asian,
      race_black: this.employee.race_black,
      race_islander: this.employee.race_islander,
      race_american_indian: this.employee.race_american_indian,
      ethnicity: this.employee.ethnicity,
      hqt: this.employee.hqt,
      ssn: this.employee.ssn,
      tcp_id: this.employee.tcp_id,
    });
  }

  revert() {
    this.getEmployee();
  }

  prepareSave(): Employee {
    const formModel = this.personForm.value;
    var updatedEmployee = this.employee;
    updatedEmployee.first_name = formModel.first_name as string;
    updatedEmployee.middle_name = formModel.middle_name as string;
    updatedEmployee.last_name = formModel.last_name as string;
    updatedEmployee.birth_date = formModel.birth_date as string;
    updatedEmployee.gender = formModel.gender as string;
    updatedEmployee.race_asian = formModel.race_asian as boolean;
    updatedEmployee.race_black = formModel.race_black as boolean;
    updatedEmployee.race_white = formModel.race_white as boolean;
    updatedEmployee.race_islander = formModel.race_islander as boolean;
    updatedEmployee.race_american_indian = formModel.race_american_indian as boolean;
    updatedEmployee.ethnicity = formModel.ethnicity as string;
    updatedEmployee.ssn = formModel.ssn as string;
    return updatedEmployee;
  }

  saveEmployee() {
    console.log("Saving Employee");
    let updatedEmployee = this.prepareSave();
    this.employeesService.updateEmployee(updatedEmployee).then(result => {
      this.update.emit({refresh: true});
    });
  }

}
