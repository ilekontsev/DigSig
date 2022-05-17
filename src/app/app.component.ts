import { Component, OnInit } from '@angular/core';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DigSig';

  constructor(private _stateService: StateService) {}

  ngOnInit(): void {
    console.log(123)
    if (localStorage.getItem('token')) {
      this._stateService.whoami();
    }
  }
}
