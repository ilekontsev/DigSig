import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  sendMail(email) {
    return this._http
      .get(`http://localhost:3000/sendMailCode/${email}`)
  }

  savePublicKeyAndMethodEncrypt(key, method) {
    return this._http
      .post('http://localhost:3000/saveKey', { key, method })
      .pipe(
        catchError((err) => {
          if (err.status === 200) return of(true);
          return of(false);
        })
      );
  }

  verifyCode(code: any, email) {
    console.log(code);
    return this._http
      .post('http://localhost:3000/users/verify', { code, email })
      .pipe(
        catchError((err) => {
          if (err.status === 200) return of(true);
          return of(false);
        })
      );
  }

  getPublicKey() {
    return this._http.get('http://localhost:3000/getPublicKey').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }

  whoami(){
    return this._http.get('http://localhost:3000/user/whoami').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }
}
