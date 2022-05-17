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
  formTemplate = 'dropzone';
  files: File[] = [];
  privateKey: any = '';

  constructor(private _digitalSignatureService: DigitalSignatureService) {}

  ngOnInit(): void {}

  async singDocument() {
    // if (!this.secretKey.trim()) {
    //   return;
    // }

    this.formTemplate = 'verification';
    // let keys = this._digitalSignatureService.generateKey();
    // console.log(keys);
    // const t = await this._digitalSignatureService.sign(keys.privateKey);
    // console.log(t);
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
