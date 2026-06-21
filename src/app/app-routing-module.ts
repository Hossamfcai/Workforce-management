import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Employee } from './components/employee/employee';
import { Departments } from './components/departments/departments';
import { Tasks } from './components/tasks/tasks';
import { DashboardSection } from './components/dashboard-section/dashboard-section';
import { LoginRedirectGuard } from './guards/login-redirect-guard';

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [LoginRedirectGuard] },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'dashboardSection', pathMatch: 'full' },
      { path: 'dashboardSection', component: DashboardSection },
      { path: 'employee', component: Employee },
      { path: 'departments', component: Departments },
      { path: 'task', component: Tasks },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect default path to login
  { path: '**', redirectTo: '/login' }, // Wildcard route for 404 handling
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
