import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dashboard } from './components/dashboard/dashboard';
import { Employee } from './components/employee/employee';
import { Departments } from './components/departments/departments';
import { Tasks } from './components/tasks/tasks';
import { DashboardSection } from './components/dashboard-section/dashboard-section';
import { StatisticsComponent } from './components/statistics-component/statistics-component';

@NgModule({
  declarations: [
    App,
    Login,
    Dashboard,
    Employee,
    Departments,
    Tasks,
    DashboardSection,
    StatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration()],
  bootstrap: [App],
})
export class AppModule {}
