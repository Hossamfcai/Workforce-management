import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  constructor(private http: HttpClient) {
    if (this.isLocalStorageAvailable) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.tokenSubject.next(token);
      }
    }
  }
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  apiURL = 'https://dummyjson.com/user/login';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiURL, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        this.tokenSubject.next(res.accessToken);
        return res;
      }),
    );
  }

  // login(username: string, password: string): boolean {
  //   if (username === 'emilys' && password === 'emilyspass') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
