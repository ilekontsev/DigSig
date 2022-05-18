import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from '../shared/services/state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public data = {};
  public login$ = new BehaviorSubject(false);
  constructor(private _http: HttpClient, private _stateService: StateService) {}

  register(data: any) {
    this._http
      .post('http://localhost:3000/createUser', data)
      .subscribe((data: any) => {
        this.setTokenInLocalStorage(data);
      });
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
    this._stateService.whoami()
    this.login$.next(true);
  }
}
