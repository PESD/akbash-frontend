import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import {AccordionModule} from 'primeng/components/accordion/accordion';
import { DataTableModule, SharedModule, TabMenuModule, MenuItem } from 'primeng/primeng';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesService } from './employees.service';
import { MenuComponent } from './menu/menu.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'workflows',  component: WorkflowsComponent },
  { path: 'employees',  component: EmployeesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    MenuComponent,
    WorkflowsComponent,
    DashboardComponent,
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
    RouterModule.forRoot(routes),
  ],
  providers: [EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
