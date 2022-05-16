import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DATA_BUTTONS, DATA_LOGIN } from './constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value = 0;
  templateNumber = 0;
  dataButtons = DATA_BUTTONS;
  dataLogin = DATA_LOGIN;
  formlogin = true;
  @Input() headerTitle: string = ''

  constructor(private _router: Router, private _apiService: ApiService) {
    localStorage.removeItem('token');
    localStorage.removeItem('refToken');
    if (this._router.url === '/login') {
      this.formlogin = true;
    } else {
      this.formlogin = false;
    }
  }

  ngOnInit(): void {
    
  }

  setFieldInput(a: string, b: string) {}

  resendEmail() {
    const data: any = {};
   
    if (this.formlogin) {
      this.dataLogin.forEach((item) => {
        data[item.key] = item.input;
      });
      this._apiService.loginUser(data);
    } else {
      this.dataButtons.forEach((item) => {
        data[item.key] = item.input;
      });
      this._apiService.register(data);
    }
  }

  resendSendCode() {}

  getResponse() {
    setTimeout(() => {
      this._router.navigateByUrl('/signature');
    }, 2000);
  }

  handleArrow(action: string) {
    if (action === 'forward' && this.value < 99) {
      this.value += 33.33;
      this.templateNumber += 1;
      this.resendEmail();
      if (this.templateNumber === 3) {
        this.getResponse();
      }
    } else if (action === 'back' && this.value !== 0) {
      this.value -= 33.33;
      this.templateNumber -= 1;
    }
  }
}
