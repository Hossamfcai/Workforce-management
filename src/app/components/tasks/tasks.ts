import { Component, OnInit } from '@angular/core';
import { Employees } from '../../models/employee.interface';
import { Task } from '../../models/task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  employeesList: Employees[] = [];
  tasksList: Task[] = [];
  taskForm!: FormGroup;
  currentPage: number = 1;
  pageSize: number = 4;
  protected readonly Math = Math;
  ngOnInit(): void {
    const localEmployees = localStorage.getItem('data');
    this.employeesList = localEmployees ? JSON.parse(localEmployees) : [];

    const localTasks = localStorage.getItem('tasks_data');
    if (localTasks) {
      this.tasksList = JSON.parse(localTasks);
    } else {
      this.tasksList = [
        {
          id: `TSK-00${Math.random()}`,
          name: 'Draft API Authentication Guard contracts',
          dueDate: '2026-06-24',
          status: 'To Do',
          assignedEmployeeId: 'EMP-003',
        },
        {
          id: `TSK-00${Math.random()}`,
          name: 'Build Reactive Form Modules Validation layouts',
          dueDate: '2026-06-21',
          status: 'In Progress',
          assignedEmployeeId: 'EMP-004',
        },
        {
          id: `TSK-00${Math.random()}`,
          name: 'Migrate router shells to legacy structures',
          dueDate: '2026-06-18',
          status: 'Done',
          assignedEmployeeId: 'EMP-005',
        },
      ];
      localStorage.setItem('tasks_data', JSON.stringify(this.tasksList));
    }

    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      assignedEmployeeId: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      status: new FormControl('To Do', Validators.required),
    });
  }

  getAssignedEmployee(employeeId: string): Employees | undefined {
    return this.employeesList.find((emp) => emp.id === employeeId);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'To Do':
        return 'bg-secondary-subtle text-secondary border border-secondary-subtle';
      case 'In Progress':
        return 'bg-primary-subtle text-primary border border-primary-subtle';
      case 'Done':
        return 'bg-success-subtle text-success border border-success-subtle';
      default:
        return 'bg-light text-dark';
    }
  }
  get sortedTasks(): Task[] {
    if (!this.tasksList) return [];

    const statusWeights: Record<string, number> = {
      'To Do': 1,
      'In Progress': 2,
      Done: 3,
    };

    return [...this.tasksList].sort((a, b) => {
      const weightA = statusWeights[a.status] || 99;
      const weightB = statusWeights[b.status] || 99;
      return weightA - weightB;
    });
  }
  onAddTask(): void {
    if (this.taskForm.valid) {
      const nextId = `TSK-00${Math.random()}`;

      const newTask: Task = {
        id: nextId,
        name: this.taskForm.value.name,
        dueDate: this.taskForm.value.dueDate,
        status: this.taskForm.value.status,
        assignedEmployeeId: this.taskForm.value.assignedEmployeeId,
      };

      this.tasksList.push(newTask);
      localStorage.setItem('tasks_data', JSON.stringify(this.tasksList));

      this.taskForm.reset({ status: 'To Do', assignedEmployeeId: '' });
    }
  }

  get paginatedTasks(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.sortedTasks.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.sortedTasks.length / this.pageSize) || 1;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  createPageArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
