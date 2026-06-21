import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(private router: Router) {}
  isSidebarOpen: boolean = false;
  ngOnInit(): void {}
  toggleSidebar(): void {
    console.log('done');
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onLogout(): void {
    localStorage.removeItem('accessToken');

    // Optional: Clear cached forms/session states if necessary
    // localStorage.removeItem('tasks_data');

    this.isSidebarOpen = false;

    this.router.navigate(['/login']);
  }
}
