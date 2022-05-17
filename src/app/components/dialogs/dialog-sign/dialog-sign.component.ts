import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DigitalSignatureService } from 'src/app/services/digital-signature.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-dialog-sign',
  templateUrl: './dialog-sign.component.html',
  styleUrls: ['./dialog-sign.component.scss'],
})
export class DialogSignComponent implements OnInit {
  title = 'dropzone';
  secretKey: any = '';
  publicKey: any = '';
  formTemplate = 'dropzone';
  files: File[] = [];
  privateKey: any = '';
  verivicationCode = '';
  signHash = '';
  constructor(
    private _digitalSignatureService: DigitalSignatureService,
    private _apiService: ApiService,
    private _stateService: StateService
  ) {}

  ngOnInit(): void {}

  async singDocument() {
    this.formTemplate = 'verification';
    this._apiService
      .sendMail(this._stateService.user?.email)
      .subscribe((data: any) => {});

    // let keys = this._digitalSignatureService.generateKey();
    // console.log(keys);
    // const t =
    // console.log(t);
  }

  singFinishDocument() {
    this._apiService
      .verifyCode(this.verivicationCode, this._stateService.user?.email)
      .subscribe(async (isVerifyed) => {
        if (isVerifyed) {
          this.signHash = await this._digitalSignatureService.sign(
            this.secretKey
          );
          this.formTemplate = 'displayHash';
        }
      });
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    this.files.forEach((file) => {
      formData.append('file[]', file);
      this._digitalSignatureService.getHash(file);
    });
  }

  resendSendCode() {}

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
