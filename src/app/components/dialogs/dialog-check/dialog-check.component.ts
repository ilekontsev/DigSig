import { Component, OnInit } from '@angular/core';
import { DigitalSignatureService } from 'src/app/services/digital-signature.service';

@Component({
  selector: 'app-dialog-check',
  templateUrl: './dialog-check.component.html',
  styleUrls: ['./dialog-check.component.scss'],
})
export class DialogCheckComponent implements OnInit {
  files = [];
  publicKey= ''
  signature = ''
  isCheck: boolean;
  formTemplate = 'verify'

  constructor(private _digitalSignatureService: DigitalSignatureService) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    console.log(event);
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

  async verifyDocument(){
    this.formTemplate = 'checkHash'
    this.isCheck = await this._digitalSignatureService.verify(this.publicKey, this.signature)
  }
}
