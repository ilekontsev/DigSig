import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { StateService } from 'src/app/shared/services/state.service';
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
  public verificationCode: string;

  @Input() headerTitle: string = '';

  constructor(
    private _router: Router,
    private _authApiService: AuthApiService
  ) {
    localStorage.removeItem('token');
    localStorage.removeItem('refToken');
    const url = window.location.href;
    this.formlogin = !url.includes('/login/register')
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
      this.dataButtons.forEach((item) => {
        data[item.key] = item.input;
      });
      this._authApiService.register(data);
    }
  }

  resendSendCode() {}

  getResponse() {
    setTimeout(() => {
      this._router.navigate(['/signature']);
    }, 2000);
  }

  handleArrow(action: string) {
    if(this.value === 0) {
      this.resendEmail();
    }
    if(this.value === 33.33) {
      this.validateCode()
    }
    if (action === 'forward' && this.value < 99) {
      this.value += 33.33;
      this.templateNumber += 1;
      if (this.templateNumber === 3) {
        this.getResponse();
      }
    } else if (action === 'back' && this.value !== 0) {
      this.value -= 33.33;
      this.templateNumber -= 1;
    }
  }

  private validateCode() {
    const verificationCode = "blablabla";
    this._authApiService.verifyCode(verificationCode).subscribe(isVerifyed => {
      // isVerifyed - observable<Bollean>
      //if yes - go forvard -> use data from previous form to send login request
      //get tokens and redirect to main
    })
  }
}
