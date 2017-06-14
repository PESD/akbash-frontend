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
        } from 'primeng/primeng';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesService } from './employees.service';
import { MenuComponent } from './menu/menu.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService }      from './auth.service';
import { AuthGuard }      from './auth.guard';
import { LoginService }      from './login.service';
import { WorkflowsService }      from './workflows.service';
import { UsersService }      from './users.service';
import { PersonstatusComponent } from './personstatus/personstatus.component';
import { PersonformComponent } from './personform/personform.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'workflows',  component: WorkflowsComponent, canActivate: [AuthGuard] },
  { path: 'employees',  component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'test/:person_id', component: PersonformComponent},
  { path: 'login',  component: LoginComponent },
];

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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
