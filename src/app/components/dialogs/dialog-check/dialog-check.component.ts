import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DigitalSignatureService } from 'src/app/services/digital-signature.service';

@Component({
  selector: 'app-dialog-check',
  templateUrl: './dialog-check.component.html',
  styleUrls: ['./dialog-check.component.scss'],
})
export class DialogCheckComponent implements OnInit {
  files = [];
  publicKey = '';
  signature = '';
  isCheck: any;
  formTemplate = 'verify';

  constructor(
    private _digitalSignatureService: DigitalSignatureService,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    this.files.forEach((file) => {
      formData.append('file[]', file);
      this._digitalSignatureService.getHash(file);
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  verifyDocument() {
    this.formTemplate = 'checkHash';
    const isCheckPublicKey = this._apiService
      .checkPublickKey(this.publicKey)
      .subscribe(async (res) => {
        this.isCheck = res
          ? await this._digitalSignatureService.switchVerify(
              this.publicKey,
              this.signature
            )
          : 'invalid public key';
      });
  }
}
