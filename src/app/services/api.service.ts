import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  sendMail() {
    const data = '';
    this._http
      .post('http://localhost:3000/sendMail', data)
      .subscribe((data: any) => {});
  }

  savePublicKeyAndMethodEncrypt(key, method) {
    return this._http.post('http://localhost:3000/saveKey', { key, method });
  }
}
