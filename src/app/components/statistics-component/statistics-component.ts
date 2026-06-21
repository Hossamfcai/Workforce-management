import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-component',
  standalone: false,
  templateUrl: './statistics-component.html',
  styleUrl: './statistics-component.css',
})
export class StatisticsComponent implements OnInit {
  totalEmployees: number = 0;
  totalDepartments: number = 0;
  activeTasksCount: number = 0;
  taskCompletionRate: number = 0;

  ngOnInit(): void {
    this.calculateDashboardMetrics();
  }

  calculateDashboardMetrics(): void {
    const employees = JSON.parse(localStorage.getItem('data') || '[]');
    const departments = JSON.parse(localStorage.getItem('departments_data') || '[]');
    const tasks = JSON.parse(localStorage.getItem('tasks_data') || '[]');

    this.totalEmployees = employees.length;
    this.totalDepartments = departments.length;

    this.activeTasksCount = tasks.filter((t: any) => t.status !== 'Done').length;

    if (tasks.length > 0) {
      const completedTasks = tasks.filter((t: any) => t.status === 'Done').length;
      this.taskCompletionRate = Math.round((completedTasks / tasks.length) * 100);
    } else {
      this.taskCompletionRate = 0;
    }
  }
}
