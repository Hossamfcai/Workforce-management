import { Component, OnInit } from '@angular/core';
import { Employees } from '../../models/employee.interface';
import { Console } from 'console';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../models/department.interface';
import { Departments } from '../departments/departments';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  // constructor(private _dataServices: Data) {}

  updateForm!: FormGroup;
  addForm!: FormGroup;
  employees: Employees[] = [];
  departments: Department[] = [];
  selectedEmployeeId: string | null = null;
  editableEmployee: Employees | null = null;

  searchQuery: string = '';
  selectedDepartment: string = 'All';

  selectedSort: string = 'default';

  ngOnInit(): void {
    this.updateForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(''),
      department: new FormControl(''),
      role: new FormControl(''),
    });

    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('Engineering', Validators.required),
      role: new FormControl('', Validators.required),
    });

    const localData = localStorage.getItem('data');
    if (localData) {
      this.employees = JSON.parse(localData);
    } else {
      this.employees = [
        {
          id: 'EMP-003',
          name: 'Esther',
          email: 'esther.h@company',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          department: 'Engineering',
          role: 'Growth Specialist',
          status: 'Active',
          dateJoined: '2023-11-01',
        },
        {
          id: 'EMP-004',
          name: 'Ronald Richards',
          email: 'ronald.r@company.com',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          department: 'Engineering',
          role: 'DevOps Engineer',
          status: 'Terminated',
          dateJoined: '2022-06-20',
        },
        {
          id: 'EMP-005',
          name: 'Kathryn Murphy',
          email: 'kathryn.m@company.com',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          department: 'Finance',
          role: 'Operations Analyst',
          status: 'Active',
          dateJoined: '2025-02-10',
        },
        {
          id: 'EMP-000.48110149865691787',
          name: 'HossamIbrahim',
          email: 'hossamibrahim.fcai23@gmail.com',
          department: 'Engineering',
          role: 'Front-end engineer',
          status: 'Active',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          dateJoined: '2026-06-21',
        },
        {
          id: 'EMP-000.5111892747593775',
          name: 'hossam',
          email: 'hossam@gmail.com',
          department: 'Engineering',
          role: 'Back-End',
          status: 'Active',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          dateJoined: '2026-06-21',
        },
        {
          id: 'EMP-000.30998501850320515',
          name: 'Ahmed',
          email: 'ahmed@gmail.com',
          department: 'Marketing',
          role: 'digital marketing',
          status: 'Active',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          dateJoined: '2026-06-21',
        },
      ];
      localStorage.setItem('departments_data', JSON.stringify(this.employees));
    }

    const localDepartments = localStorage.getItem('departments_data');

    this.employees = localData ? JSON.parse(localData) : [];
    this.departments = localDepartments ? JSON.parse(localDepartments) : [];

    console.log('Loaded from storage:', this.employees);
  }
  prepareDelete(id: string): void {
    this.selectedEmployeeId = id;
  }
  confirmDelete(): void {
    if (this.selectedEmployeeId) {
      this.employees = this.employees.filter((emp) => emp.id !== this.selectedEmployeeId);
      console.log(this.employees);

      localStorage.setItem('data', JSON.stringify(this.employees));

      this.selectedEmployeeId = null;
    }
  }
  prepareUpdateEmployee(employee: Employees | null): void {
    this.editableEmployee = employee;
    this.updateForm.patchValue({
      name: employee?.name,
      email: employee?.department,
      department: employee?.department,
      role: employee?.role,
    });
  }
  submitUpdateForm() {
    this.employees = this.employees.map((emp) =>
      emp.id === this.editableEmployee?.id
        ? {
            ...emp,
            name: this.updateForm.value.name,
            email: this.updateForm.value.email,
            department: this.updateForm.value.department,
            role: this.updateForm.value.role,
          }
        : emp,
    );
    localStorage.setItem('data', JSON.stringify(this.employees));
    console.log(this.employees);
  }

  onAddEmployee(): void {
    if (this.addForm.valid) {
      const nextId = `EMP-00${Math.random()}`;

      const newEmployee: Employees = {
        id: nextId,
        name: this.addForm.value.name,
        email: this.addForm.value.email,
        department: this.addForm.value.department,
        role: this.addForm.value.role,
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        dateJoined: new Date().toISOString().split('T')[0],
      };

      // 3. Append to state list and save to storage context
      this.employees.push(newEmployee);
      localStorage.setItem('data', JSON.stringify(this.employees));

      this.departments = this.incrementMembersOfDeparment(newEmployee.department);
      localStorage.setItem('departments_data', JSON.stringify(this.departments));
      // 4. Reset the form controls fields back to pristine states
      this.addForm.reset({ department: 'Engineering' });
    }
  }
  incrementMembersOfDeparment(department: string): Department[] {
    return this.departments.map((dep) => {
      if (department.toLocaleLowerCase() === dep.name.toLocaleLowerCase()) {
        return { ...dep, members: dep.members + 1 };
      } else {
        return dep;
      }
    });
  }
  get filteredEmployees(): Employees[] {
    if (!this.employees) return [];

    let result = this.employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesDept =
        this.selectedDepartment === 'All' || emp.department === this.selectedDepartment;

      return matchesSearch && matchesDept;
    });

    if (this.selectedSort === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.selectedSort === 'status') {
      result.sort((a, b) => a.status.localeCompare(b.status));
    }

    return result;
  }
}
