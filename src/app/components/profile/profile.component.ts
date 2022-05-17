import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { GenerateKeyComponent } from '../dialogs/generate-key/generate-key.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _dialog: MatDialog) {}
  settingsList: any[] = [
    { title: 'Open key', info: '**********************' },
    { title: 'Number of signed files', info: 1 },
  ];

  ngOnInit(): void {}

  generateKey() {
    const dialogRef = this._dialog.open(GenerateKeyComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }
}
