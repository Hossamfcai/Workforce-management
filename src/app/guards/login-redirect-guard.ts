import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

    if (isLoggedIn) {
      console.log('yes,is logged in');
      return this.router.parseUrl('/tasks');
    }

    return true;
  }
}
