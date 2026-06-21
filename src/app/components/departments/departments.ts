import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: false,
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments implements OnInit {
  departmentsList: Department[] = [];
  deptForm!: FormGroup;

  ngOnInit(): void {
    const localData = localStorage.getItem('departments_data');
    if (localData) {
      this.departmentsList = JSON.parse(localData);
    } else {
      this.departmentsList = [
        {
          name: 'Engineering',
          members: 4,
          description:
            'Responsible for building scaling infrastructures, applications systems modules, and tooling workflows updates.',
          budget: 78,
        },
        {
          name: 'Design',
          members: 0,
          description:
            'Overseeing brand guidelines alignments, product design flows frameworks, wireframes architecture, and graphics layout.',
          budget: 92,
        },
        {
          name: 'Marketing',
          members: 0,
          description:
            'Directing customer acquisition models, brand advertising strategies, global outreach funnels, and data metric setups.',
          budget: 45,
        },
        {
          name: 'Finance',
          members: 1,
          description:
            'Manages corporate fiscal health, capital allocation, budget tracking, and financial forecasting to drive sustainable growth',
          budget: 45,
        },
      ];
      localStorage.setItem('departments_data', JSON.stringify(this.departmentsList));
    }
    console.log(this.departmentsList);

    this.deptForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      members: new FormControl(1, [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      budget: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    });
  }

  onAddDepartment(): void {
    if (this.deptForm.valid) {
      const newDept: Department = {
        name: this.deptForm.value.name,
        members: this.deptForm.value.members,
        description: this.deptForm.value.description,
        budget: this.deptForm.value.budget,
      };

      this.departmentsList.push(newDept);
      localStorage.setItem('departments_data', JSON.stringify(this.departmentsList));

      this.deptForm.reset({ members: 1, budget: 0 });
    }
  }
}
