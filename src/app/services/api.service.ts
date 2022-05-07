import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  data = {};
  login = new BehaviorSubject(false);
  constructor(private _http: HttpClient) {}

  register(data: any) {
    this._http
      .post('http://localhost:3000/createUser', data)
      .subscribe((data: any) => {
        this.setTokenInLocalStorage(data);
      });
  }

  loginUser(data: any) {
    this._http.post('http://localhost:3000/user', data).subscribe((data) => {
      this.setTokenInLocalStorage(data);
    });
  }

  setTokenInLocalStorage(data: any) {
    this.data = data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('refToken', data.refToken);
    this.login.next(true);
  }
}
