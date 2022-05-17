import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DigitalSignatureService } from 'src/app/services/digital-signature.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.scss'],
})
export class GenerateKeyComponent implements OnInit {
  formStep = 'select';
  algorithms = ['SHA', 'RSA', 'ECDSA'];
  privateKey = '';
  publicKey = '';
  emailVerify = false;

  constructor(
    private _digitalSignatureService: DigitalSignatureService,
    private _apiService: ApiService,
    private _stateService: StateService
  ) {}

  ngOnInit(): void {}

  backStep() {
    this.formStep = 'select';
  }

  generateKey() {
    this.formStep = 'email';
  }

  async generateKeyFinish() {
    this.formStep = 'text';
    const dataKeys = await this._digitalSignatureService.generateKey();
    this._apiService
      .savePublicKeyAndMethodEncrypt(dataKeys.publicKey, 'RSASSA-PKCS1-V1_5')
      .subscribe((data) => {
        if (data) {
          this._stateService.publicKey$.next(dataKeys.publicKey)
          this.publicKey = dataKeys.publicKey;
          this.privateKey = dataKeys.privateKey;
        }
      });
  }

  resendSendCode() {}
}
