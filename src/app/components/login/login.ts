import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, // This means it's a standalone component
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  constructor(
    private auth: Auth,
    private _route: Router,
  ) {}
  errMassage = {
    msg: '',
    show: false,
  };
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }
  count: number = 0;
  setIncrement() {
    this.count++;
    console.log(this.count);
  }

  submitForm() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (res) => {
        console.log(res.accessToken);
        this._route.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.errMassage = { msg: 'Incorrect password or username', show: true };
        console.log('done');
      },
    });
  }
}
