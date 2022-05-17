import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public login$ = new Subject();
  public publicKey$ = new Subject();
  public user: any = {};
  constructor(private _apiService: ApiService) {}

  whoami() {
    this._apiService.whoami().subscribe((data) => {
      this.user = data;
    });
  }
}
