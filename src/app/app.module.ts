import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { AccordionModule } from 'primeng/components/accordion/accordion';
import {
          DataTableModule,
          SharedModule,
          TabMenuModule,
          MenuItem,
          DialogModule,
          ButtonModule,
          DropdownModule,
          ConfirmDialogModule,
          ConfirmationService,
          InputTextModule,
          PasswordModule,
          GrowlModule,
          Message,
          StepsModule,
          SelectButtonModule,
          DataGridModule,
          PanelModule,
          CalendarModule,
          MultiSelectModule,
          CheckboxModule,
          BlockUIModule,
          InputTextareaModule,
          OverlayPanelModule,
          PickListModule,
          OrganizationChartModule,
          ChartModule,
        } from 'primeng/primeng';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesService } from './_services/employees.service';
import { AuditlogService } from './_services/auditlog.service';
import { MenuComponent } from './menu/menu.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService }      from './_services/auth.service';
import { AuthGuard }      from './_guards/auth.guard';
import { LoginService }      from './_services/login.service';
import { WorkflowsService }      from './_services/workflows.service';
import { WorkflowactivityService }      from './_services/workflowactivity.service';
import { UsersService }      from './_services/users.service';
import { HttperrorService } from './_services/httperror.service';
import { PersonstatusComponent } from './personstatus/personstatus.component';
import { PersonformComponent } from './personform/personform.component';
import { PersontaskComponent } from './persontask/persontask.component';
import { ContractorComponent } from './contractor/contractor.component';
import { CommentsComponent } from './comments/comments.component';
import { PersongridComponent } from './persongrid/persongrid.component';
import { EmployeegridComponent } from './employeegrid/employeegrid.component';
import { PersonlogComponent } from './personlog/personlog.component';
import { TransferformComponent } from './transferform/transferform.component';
import { WorkflowchartComponent } from './workflowchart/workflowchart.component';
import { SubgridComponent } from './subgrid/subgrid.component';
import { ContractorgridComponent } from './contractorgrid/contractorgrid.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'workflows',  component: WorkflowsComponent, canActivate: [AuthGuard] },
  { path: 'employees',  component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'contractor', component: ContractorComponent, canActivate: [AuthGuard] },
  { path: 'employeegrid', component: EmployeegridComponent, canActivate: [AuthGuard] },
  { path: 'contractorgrid', component: ContractorgridComponent, canActivate: [AuthGuard] },
  { path: 'subgrid', component: SubgridComponent, canActivate: [AuthGuard] },
  { path: 'test/:person_id', component: PersonformComponent},
  { path: 'login',  component: LoginComponent },
];

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
  };

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    MenuComponent,
    WorkflowsComponent,
    DashboardComponent,
    LoginComponent,
    PersonstatusComponent,
    PersonformComponent,
    PersontaskComponent,
    ContractorComponent,
    CommentsComponent,
    PersongridComponent,
    EmployeegridComponent,
    PersonlogComponent,
    TransferformComponent,
    WorkflowchartComponent,
    SubgridComponent,
    ContractorgridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AccordionModule,
    DataTableModule,
    SharedModule,
    TabMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ConfirmDialogModule,
    InputTextModule,
    PasswordModule,
    GrowlModule,
    SelectButtonModule,
    StepsModule,
    DataGridModule,
    PanelModule,
    CalendarModule,
    MultiSelectModule,
    CheckboxModule,
    BlockUIModule,
    InputTextareaModule,
    OverlayPanelModule,
    PickListModule,
    OrganizationChartModule,
    ChartModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    EmployeesService,
    ConfirmationService,
    AuthService,
    AuthGuard,
    LoginService,
    WorkflowsService,
    UsersService,
    WorkflowactivityService,
    HttperrorService,
    AuditlogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
