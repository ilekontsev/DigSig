import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-dialog-sign',
  templateUrl: './dialog-sign.component.html',
  styleUrls: ['./dialog-sign.component.scss'],
})
export class DialogSignComponent implements OnInit {
  title = 'dropzone';

  constructor(private _stateService: StateService) {}

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

    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }
  }

  resendSendCode() {}

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
