import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators }            from '@angular/forms';

import {SelectItem} from 'primeng/primeng';

import { Employee, Person } from '../_models/api.model';
import { EmployeesService } from '../_services/employees.service';
import { FormHelper } from '../_helpers/formhelper';


declare global {
  interface Date {
    yyyymmdd(): string;
  }
}

Date.prototype.yyyymmdd = function() {
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();

  if (mm.length===1) {
    mm = "0" + mm;
  }

  if (dd.length===1) {
    dd = "0" + dd;
  }

    return [this.getFullYear(), mm, dd].join('-'); // padding
  }


@Component({
  selector: 'app-personform',
  templateUrl: './personform.component.html',
  styleUrls: ['./personform.component.css']
})
export class PersonformComponent implements OnInit {
  @Input() person_id: string;
  @Output() update = new EventEmitter<any>();
  person: Person;
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
    this.getPerson();
  }

  getPerson() {
    this.employeesService.getPerson(this.person_id).then(person => {
      this.person = person;
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
      start_date: '',
      is_visions_account_needed: [false],
      is_synergy_account_needed: [false],
    });
  }

  updateForm() {
    this.personForm.patchValue({
      first_name: this.person.first_name,
      middle_name: this.person.middle_name,
      last_name: this.person.last_name,
      birth_date: this.person.birth_date,
      gender: this.person.gender,
      race_white: this.person.race_white,
      race_asian: this.person.race_asian,
      race_black: this.person.race_black,
      race_islander: this.person.race_islander,
      race_american_indian: this.person.race_american_indian,
      ethnicity: this.person.ethnicity,
      hqt: this.person.hqt,
      ssn: this.person.ssn,
      tcp_id: this.person.tcp_id,
      start_date: this.person.start_date,
      is_visions_account_needed: this.person.is_visions_account_needed,
      is_synergy_account_needed: this.person.is_synergy_account_needed,
    });
  }

  revert() {
    this.getPerson();
  }

  prepareSave(): Employee {
    const formModel = this.personForm.value;
    let updatedPerson = this.person;
    let bday_string = formModel.birth_date as string
    if (!(formModel.birth_date.length===10)) {
      let birth_date = formModel.birth_date as Date;
      bday_string = birth_date.yyyymmdd();
    }
    let start_date_string = formModel.start_date as string
    if (!(formModel.start_date.length===10)) {
      let start_date = formModel.start_date as Date;
      start_date_string = start_date.yyyymmdd();
    }
    updatedPerson.first_name = formModel.first_name as string;
    updatedPerson.middle_name = formModel.middle_name as string;
    updatedPerson.last_name = formModel.last_name as string;
    updatedPerson.birth_date = bday_string;
    updatedPerson.gender = formModel.gender as string;
    updatedPerson.race_asian = formModel.race_asian as boolean;
    updatedPerson.race_black = formModel.race_black as boolean;
    updatedPerson.race_white = formModel.race_white as boolean;
    updatedPerson.race_islander = formModel.race_islander as boolean;
    updatedPerson.race_american_indian = formModel.race_american_indian as boolean;
    updatedPerson.ethnicity = formModel.ethnicity as string;
    updatedPerson.ssn = formModel.ssn as string;
    updatedPerson.start_date = start_date_string;
    updatedPerson.is_visions_account_needed = formModel.is_visions_account_needed as boolean
    updatedPerson.is_synergy_account_needed = formModel.is_synergy_account_needed as boolean
    return updatedPerson;
  }

  saveEmployee() {
    console.log("Saving Employee");
    let updatedPerson = this.prepareSave();
    this.employeesService.updatePerson(updatedPerson).then(result => {
      this.update.emit({refresh: true});
    });
  }

}
