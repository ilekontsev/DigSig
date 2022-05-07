import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public widthDialog = new BehaviorSubject('60%');

  constructor() {}

  changeWidthDialog(width: string): void {
    this.widthDialog.next(width);
  }
}
