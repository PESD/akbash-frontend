import { Component, OnInit, Input } from '@angular/core';
import { Message, ConfirmationService, SelectItem } from 'primeng/primeng';
import { EmployeesService } from '../_services/employees.service';
import { PersonSkinny, VisionsPosition, Location } from '../_models/api.model';

@Component({
  selector: 'app-transferform',
  templateUrl: './transferform.component.html',
  styleUrls: ['./transferform.component.css']
})
export class TransferformComponent implements OnInit {
  @Input() person_id: string;
  visionsPositions: VisionsPosition[];
  locations: Location[];
  selectPositions: SelectItem[];
  selectedPosition: SelectItem;

  constructor(
    private employeesService: EmployeesService,
    private confirmationService: ConfirmationService,
  ) { }

  getVisionsPositions() {
    this.visionsPositions = [];
    this.employeesService.getVisionsPositions().then(visionsPositions => {
      this.visionsPositions = visionsPositions;
      this.mapPositionSelect();
    })
  }

  mapPositionSelect() {
    this.selectPositions = [];
    for (let position of this.visionsPositions) {
      let positionLabel = position.type + " - " + position.description;
      this.selectPositions.push({label: positionLabel, value: position.id})
    }
  }

  getLocations() {
    this.employeesService.getLocations().then(locations => {
      this.locations = locations;
    })
  }

  onChange(event) {

  }

  ngOnInit() {
    this.getVisionsPositions();
    this.getLocations();
  }

}
