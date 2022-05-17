import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public data = {};
  public login$ = new BehaviorSubject(false);
  constructor(private _http: HttpClient) {}

  register(data: any) {
    this._http
      .post('http://localhost:3000/createUser', data)
      .subscribe((data: any) => {
        this.setTokenInLocalStorage(data);
      });
  }

  verifyCode(code: any) {
    const url = 'http://localhost:3000/users/verify/' + code;
    return this._http.get(url, {}).pipe(
      map(response => {
        if(response instanceof HttpResponse) {
          if(response.status === 200) return of(true)
          else return of(false);
        }
        else return of(false);
      })
    )
  }

  loginUser(data: any) {
    this._http.post('http://localhost:3000/user', data).subscribe(
      (data) => {
        this.setTokenInLocalStorage(data);
      },
    );

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
