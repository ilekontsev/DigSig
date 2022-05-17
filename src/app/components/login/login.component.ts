import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { DATA_BUTTONS, DATA_LOGIN } from './constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  value = 0;
  templateNumber = 0;
  dataRegister = DATA_BUTTONS;
  dataLogin = DATA_LOGIN;
  formlogin = true;
  public verificationCode: string;
  user = { email: '' };
  showData = [];
  emailUser = '';
  @Input() headerTitle: string = '';

  constructor(
    private _router: Router,
    private _authApiService: AuthApiService,
    private _apiService: ApiService
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('refToken');
    const url = window.location.href;
    this.formlogin = !url.includes('/login/register');
  }

  ngOnInit(): void {}

  setFieldInput(a: string, b: string) {}

  resendEmail() {
    const data: any = {};

    if (this.formlogin) {
      this.dataLogin.forEach((item) => {
        data[item.key] = item.input;
      });
      this._authApiService.loginUser(data);
    } else {
      this.dataRegister.forEach((item) => {
        data[item.key] = item.input;
      });
      this._authApiService.register(data);
    }
  }


  handleArrow(action: string) {
    if (action === 'forward' && this.value <= 100) {
      if (!!this.checkField()) {
        return;
      }
      this.value += 50;
      this.templateNumber += 1;

      if (this.templateNumber === 1) {
        this.sendCode();
      }

      if (this.templateNumber === 2) {
        this.validateCode();
        this.resendEmail();
      }
    } else if (action === 'back' && this.value !== 0) {
      this.value -= 50;
      this.templateNumber -= 1;
    }
  }

  sendCode() {
    this._apiService.sendMail(this.emailUser).subscribe((data: any) => {});;
  }

  private validateCode() {
    this._apiService
      .verifyCode(this.verificationCode, this.emailUser)
      .subscribe((isVerifyed) => {
        console.log(isVerifyed);
        isVerifyed
          ? this._router.navigate(['/signature'])
          : (this.templateNumber = 1);
      });
  }

  checkField() {
    this.showData = [];
    if (this.formlogin) {
      this.dataLogin.forEach((item) => {
        if (!item.input.trim()) {
          this.showData.push(item);
        }
        if (item.key === 'email') {
          this.emailUser = item.input;
        }
      });
    } else {
      let pass = '';
      let repeatPass = '';
      this.dataRegister.forEach((item) => {
        if (!item.input.trim()) {
          this.showData.push(item);
        } else if (item.key === 'password') {
          pass = item.input;
        } else if (item.key === 'repeatPassword') {
          repeatPass = item.input;
        }
        if (item.key === 'email') {
          this.emailUser = item.input;
        }
      });
      if (repeatPass !== pass) {
        this.showData.push({ key: 'not equals passwords' });
      }
    }
    return this.showData.length;
  }
}
