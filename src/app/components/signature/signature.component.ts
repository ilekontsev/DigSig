import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogSignComponent } from '../dialogs/dialog-sign/dialog-sign.component';
import { take } from 'rxjs/operators';
import { DialogCheckComponent } from '../dialogs/dialog-check/dialog-check.component';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialogSign(): void {
    const dialogRef = this._dialog.open(DialogSignComponent, {
      width: '60%',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }

  openDialogCheck(): void{
    const dialogRef = this._dialog.open(DialogCheckComponent, {
      width: '60%',
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }

}
