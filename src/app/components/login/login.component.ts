import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value = 0;
  templateNumber = 0;
  constructor() {}

  ngOnInit(): void {}

  handleArrow(action: string) {
    if (action === 'forward' && this.value < 99) {
      this.value += 33.33;
      this.templateNumber += 1;
    } else if (action === 'back' && this.value !== 0) {
      this.value -= 33.33;
      this.templateNumber -= 1;
    }
  }
}
