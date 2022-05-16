import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public data = {};
  public login$ = new BehaviorSubject(false);
  constructor(private _http: HttpClient) {}

  register(data: any) {
    this._http
      .post('http://localhost:3000/createUser', data)
      .subscribe((data: any) => {
        this.setTokenInLocalStorage(data);
      });
    //delete this when was backend

      this.setTokenInLocalStorage(data);

  }

  loginUser(data: any) {
    this._http.post('http://localhost:3000/user', data).subscribe(
      (data) => {
        this.setTokenInLocalStorage(data);
      },
    );
    //delete this when was backend
    this.setTokenInLocalStorage(data);

  }

  refreshToken(): Observable<any> {
    return this._http.post('http://localhost:3000/users/refreshToken', {
      refToken: localStorage.getItem('refToken'),
    });
  }

  setTokenInLocalStorage(data: any) {
    this.data = data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('refToken', data.refToken);
    this.login$.next(true);
  }
}
