import { Component, OnInit, Input } from '@angular/core';

import { ModelLog } from '../_models/auditlog.model';
import { AuditlogService } from '../_services/auditlog.service';

@Component({
  selector: 'app-personlog',
  templateUrl: './personlog.component.html',
  styleUrls: ['./personlog.component.css']
})
export class PersonlogComponent implements OnInit {
  @Input() person_id: string;
  modelLogs: ModelLog[];
  selectedModelLog: ModelLog;


  constructor(private auditlogService: AuditlogService) { }

  ngOnInit() {
    this.getModelLogs();
  }

  getModelLogs() {
    this.auditlogService.getModelLogByPerson(this.person_id).then(modelLogs => {
      this.modelLogs = modelLogs;
    })
  }

  onRowSelect(event) { }
  onRowUnselect(event) { }

}
