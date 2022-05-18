import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  algorithms = ['ECDSA', 'RSASSA',];
  privateKey = '';
  publicKey = '';
  emailVerify = false;
  verivicationCode = '';
  dataUser: any = {};
  selectedAlgorithm = this.algorithms[0];

  constructor(
    private _digitalSignatureService: DigitalSignatureService,
    private _apiService: ApiService,
    private _stateService: StateService,
    public dialogRef: MatDialogRef<GenerateKeyComponent>
  ) {}

  ngOnInit(): void {
    this._stateService.user$.subscribe((data) => (this.dataUser = data));
    this._apiService.getPublicKey().subscribe((data) => {
      if (data.key) {
        this.formStep = 'answer';
      } else {
        this.formStep = 'select';
      }
    });
  }

  backStep() {
    this.formStep = 'select';
  }

  generateKey() {

    this.formStep = 'email';
    this._apiService.sendMail(this.dataUser.email).subscribe((data: any) => {});
  }

  generateKeyFinish() {
    let isCheckCode = false;
    this._apiService
      .verifyCode(this.verivicationCode, this.dataUser.email)
      .subscribe(async (data) => {
        isCheckCode = data;
        if (!isCheckCode) {
          return;
        }
        this.formStep = 'text';
        const dataKeys = await this._digitalSignatureService.switchGenerateKeys(
          this.selectedAlgorithm
        );
        this._apiService
          .savePublicKeyAndMethodEncrypt(
            dataKeys.publicKey,
            'RSASSA-PKCS1-V1_5'
          )
          .subscribe((data) => {
            if (data) {
              this._stateService.publicKey$.next(dataKeys.publicKey);
              this.publicKey = dataKeys.publicKey;
              this.privateKey = dataKeys.privateKey;
            }
          });
      });
  }

  resendSendCode() {
    this._apiService.sendMail(this.dataUser.email).subscribe((data: any) => {});
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
