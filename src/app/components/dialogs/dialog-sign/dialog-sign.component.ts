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

  constructor(
    private _stateService: StateService,
    private _digitalSignatureService: DigitalSignatureService
  ) {}

  ngOnInit(): void {}
  formTemplate = 'dropzone';
  files: File[] = [];

  singDocument() {
    this.formTemplate = 'verification';
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    this.files.forEach(file => {
      formData.append('file[]', file);
      this._digitalSignatureService.sign(file)
    })

  
  }

  resendSendCode() {}

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
