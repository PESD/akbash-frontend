import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'workflows',  component: WorkflowsComponent, canActivate: [AuthGuard] },
  { path: 'employees',  component: EmployeesComponent, canActivate: [AuthGuard] },
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    RouterModule.forRoot(routes),
  ],
  providers: [
    EmployeesService,
    ConfirmationService,
    AuthService,
    AuthGuard,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
