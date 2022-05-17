import { Component, OnInit, Output } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogSignComponent } from '../dialogs/dialog-sign/dialog-sign.component';
import { take } from 'rxjs/operators';
import { DialogCheckComponent } from '../dialogs/dialog-check/dialog-check.component';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  widthDialog = '60%';
  constructor(
    private _dialog: MatDialog,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {

  }

  openDialogSign(): void {
    const dialogRef = this._dialog.open(DialogSignComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }

  openDialogCheck(): void {
    const dialogRef = this._dialog.open(DialogCheckComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }
}
