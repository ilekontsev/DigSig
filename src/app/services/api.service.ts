import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mapTo, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  sendMail(email) {
    return this._http.get(`http://localhost:3000/sendMailCode/${email}`);
  }

  checkPublickKey(publicKey) {
    return this._http
      .post('http://localhost:3000/checkPublicKey', { publicKey })
      .pipe(
        catchError((err) => {
          if (err.status === 200) return of(true);
          return of(false);
        })
      );
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

  verifyCode(code: any, email): Observable<boolean> {
    return this._http
      .post('http://localhost:3000/users/verify', { code, email })
      .pipe(
        map(() => true),
        catchError((err) => {
          if (err.status === 200) return of(true);
          return of(false);
        })
      );
  }

  updateCountFiles() {
    return this._http
      .post('http://localhost:3000/updateCountSignFiles', {})
      .subscribe();
  }

  getPublicKey() {
    return this._http.get('http://localhost:3000/getPublicKey').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }

  getAllPublicKey(){
    return this._http.get('http://localhost:3000/getAllPublicKey').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }


  deleteKey() {
    return this._http.delete('http://localhost:3000/deleteKey').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }

  whoami() {
    return this._http.get('http://localhost:3000/user/whoami').pipe(
      catchError((err) => {
        if (err.status === 200) return of(err.error?.text);
        return of(false);
      })
    );
  }
}
