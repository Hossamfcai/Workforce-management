import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employees } from '../models/employee.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private http: HttpClient) {}
  private EmployeesURL: string = 'https://workforcemanagement.free.beeceptor.com/employees';

  private index = new BehaviorSubject<number>(1);
  index$ = this.index.asObservable();

  private Employees = new BehaviorSubject<Employees[]>([]);
  Employees$ = this.index.asObservable();

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.EmployeesURL);
  }
}
