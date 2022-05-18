import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-delete-key',
  templateUrl: './delete-key.component.html',
  styleUrls: ['./delete-key.component.scss'],
})
export class DeleteKeyComponent implements OnInit {
  formTemplate = 'message';
  dataUser: any = {};
  verivicationCode = '';
  showMessage = 'Error'

  constructor(
    public dialogRef: MatDialogRef<DeleteKeyComponent>,
    private _stateService: StateService,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this._stateService.user$.subscribe((data) => (this.dataUser = data));
  }

  deleteKey() {
    this._apiService.sendMail(this.dataUser.email).subscribe((data: any) => {});
    this.formTemplate = 'verification';
  }

  finishDeleteKey() {
    this._apiService.deleteKey().subscribe(data => {
        this.formTemplate = 'text'
        this.showMessage = data

    })
  }

  resendSendCode() {
    this._apiService.sendMail(this.dataUser.email).subscribe((data: any) => {});
  }

  onCloseClick() {
    this.dialogRef.close();
  }
}
