import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
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

  constructor(
    private _stateService: StateService,
    private _digitalSignatureService: DigitalSignatureService
  ) {}

  ngOnInit(): void {}
  formTemplate = 'dropzone';
  files: File[] = [];
  privateKey: any = '';
  singDocument() {
    if (!this.secretKey.trim()) {
      return;
    }

    this.formTemplate = 'verification';
    this._digitalSignatureService.sign(this.secretKey);
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

  inputSecretKey(event: any) {
    this.secretKey = event;
  }
  generateKey() {
    this._digitalSignatureService.generateKey().then((dataKeys) => {
      console.log(dataKeys)
      this.secretKey = dataKeys.privateKey;
      this.publicKey = dataKeys.publicKey;
    });
  }

  resendSendCode() {}

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
